import { useRef, useState, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

import AddressService from "@/services/address-service";
import type { IAddress } from "@/commons/types";

interface AddressModalProps {
  visible: boolean;
  onHide: () => void;
}

export const NewAddessModal = ({visible, onHide}: AddressModalProps) => {

   const {
      control,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
      setValue, // Usado quando o CEP é buscado pela API
      watch, // Usado para "assistir" os campos, aciona uma re-renderização do componente quando o valor do campo observado muda.
   } = useForm<IAddress>({ defaultValues: { street: "", complement: "", cep: "", city: "", state: "" } });

   const toast = useRef<Toast>(null);

   const [loading, setLoading] = useState(false);

   const { save, buscaEnderecoPorCEP } = AddressService;

   // Usa 'watch' para obter o valor atual do campo 'cep'.
   // Este valor será usado quando o botão de busca de CEP for clicado.
   const cepValue = watch("cep");

   // Função que irá realizar a busca do endereço a partir do CEP informado
   const handleCepSearch = useCallback(async () => {
      toast.current?.clear();

      // Remove caracteres não numéricos do CEP e verifica se tem 8 dígitos
      const cleanCep = cepValue?.replace(/\D/g, "");
      if (!cleanCep || cleanCep.length !== 8) {
         toast.current?.show({
            severity: "warn",
            summary: "CEP Inválido",
            detail: "Por favor, digite um CEP válido com 8 dígitos.",
            life: 3000,
         });
         return; // Sai da função se o CEP for inválido
      }

      setLoading(true); // Mostra o carregamento
      try {
         const response = await buscaEnderecoPorCEP(cleanCep);
         if(response.status === 200 && response.data) {
            // Utiliza o setValue para preencher os campos do formulário com o retorno da busca
            setValue("street", response.data.street);
            setValue("city", response.data.city);
            setValue("state", response.data.state);
            toast.current?.show({
               severity: "success",
               summary: "Sucesso",
               detail: "Endereço encontrado e preenchido!",
               life: 3000,
            });

         } else {
            // Se a busca falhar (mas não for um 404, que significa CEP não encontrado), exibe um erro genérico
            if (response.status !== 404) { // 404 geralmente significa que o CEP não existe na base da ViaCEP
               toast.current?.show({
                  severity: "error",
                  summary: "Erro na Busca",
                  detail: response.message,
                  life: 3000,
               });
            } else {
               toast.current?.show({
                  severity: "info",
                  summary: "CEP Não Encontrado",
                  detail: "O CEP digitado não foi encontrado. Por favor, preencha o endereço manualmente.",
                  life: 4000,
               });
            }
         } 
      } catch (error) {
         console.error("Erro ao buscar CEP:", error);
         toast.current?.show({
            severity: "error",
            summary: "Erro Inesperado",
            detail: "Ocorreu um erro ao tentar buscar o CEP. Tente novamente.",
            life: 3000,
         });
      } finally {
         // Desativa o carregamento, 
         setLoading(false); 
      }
   }, [cepValue, setValue, buscaEnderecoPorCEP, toast]); 
   // Dependências do useCallback: 'cepValue' para pegar o valor, 'setValue' para atualizar campos, 'buscaEnderecoPorCEP' é o serviço, 'toast' para exibir mensagens.

   const handleCancel = () => {
      reset(); // limpa todos os campos
      onHide(); // fecha o modal
   };

   const onSubmit = async (newAddress: IAddress) => {
      setLoading(true);

      try {
         const response = await save(newAddress);
         if (response.status === 200 && response.data) {
            toast.current?.show({
               severity: "success",
               summary: "Sucesso",
               detail: "Endereço cadastrado com sucesso.",
               life: 3000,
            })
            handleCancel();
         } else {
            toast.current?.show({
            severity: "error",
            summary: "Erro",
            detail: "Ocorreu um erro ao cadastrar o endereço.",
            life: 3000,
         })
         }

      }  catch {
         toast.current?.show({
            severity: "error",
            summary: "Erro",
            detail: "Ocorreu um erro ao cadastrar o endereço.",
            life: 3000,
         })
      } finally {
         setLoading(false);
      }
   }

   return (
      <div>
         <Toast ref={toast} />
         <Dialog
         visible={visible}
         modal
         onHide={onHide}
         style={{ width: '40vw', maxWidth: '500px' }}
         breakpoints={{ '960px': '75vw', '640px': '90vw' }}
         content={() => (
            <div className="flex flex-col px-8 py-5" style={{
              borderRadius: "12px",
              backgroundColor: "var(--surface-card)"
            }}>
              <h2 className="mb-2 font-bold text-xl">Novo Endereço</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
               {/* CEP */}
               <div className="flex flex-col gap-1">
                  <label htmlFor="cep" className="text-sm font-semibold">
                    CEP
                  </label>
                  <div className="p-inputgroup">
                     <Controller
                        name="cep"
                        control={control}
                        rules={{ 
                           required: "Informe o CEP",
                           minLength: {
                              value: 9, // Considerando 8 dígitos + 1 hífen
                              message: "O CEP deve ter 8 dígitos (ex: 12345-678)"
                           },
                           maxLength: {
                              value: 9, // Considerando 8 dígitos + 1 hífen
                              message: "O CEP deve ter no máximo 8 dígitos (ex: 12345-678)",
                           },
                           pattern: {
                              value: /^\d{5}-?\d{3}$/, // Padrão de expressão regular para CEP (5 dígitos + opcional hífen + 3 dígitos)
                              message: "CEP inválido", // Mensagem de erro se o padrão não for correspondido
                           },
                        }}
                        render={({ field }) => (
                           <InputText
                              id="cep"
                              {...field}
                              onChange={(e) => {
                              // Formatação opcional do CEP enquanto o usuário digita:
                              // Remove todos os caracteres não numéricos.
                              let formattedCep = e.target.value.replace(/\D/g, "");
                              // Adiciona o hífen após o quinto dígito, se houver mais de 5 dígitos.
                              if (formattedCep.length > 5) {
                                 formattedCep =
                                    formattedCep.substring(0, 5) +
                                    "-" +
                                    formattedCep.substring(5, 8);
                              }
                              field.onChange(formattedCep); // Atualiza o valor do campo no formulário
                              }}

                              className={`w-full ${
                                 errors.cep ? "p-invalid border-red-500" : ""
                              }`}
                              style={{
                                 backgroundColor: "var(--surface-ground)",
                                 border: "1px solid var(--surface-border)",
                                 padding: "0.5rem",
                                 borderRadius: "6px",
                              }}
                              keyfilter="num" // Filtra para permitir apenas entrada de números
                              maxLength={9} // Limita o número máximo de caracteres (8 dígitos + 1 hífen)
                           />
                           
                        )}
                     />
                     {/* Botão para buscar o CEP, ao lado do campo de input */}
                     <Button
                        icon="pi pi-search"
                        className="p-button-secondary"
                        onClick={handleCepSearch}
                        loading={loading} // Exibe um spinner se a busca estiver em progresso
                        disabled={loading || !cepValue || cepValue.replace(/\D/g, '').length !== 8} // Desabilita se estiver carregando, CEP vazio ou incompleto
                        aria-label="Buscar CEP"
                     />
                  </div>
                  {errors.cep && (
                    <small className="text-red-400">{errors.cep.message}</small>
                  )}
               </div>

               {/* Estado */}
               <div className="flex flex-col gap-1">
               <label htmlFor="state" className="text-sm font-semibold">
                  Estado
               </label>
               <Controller
                  name="state"
                  control={control}
                  rules={{ 
                     required: "Informe o Estado",
                     minLength: { 
                        value: 2,
                        message: "O Estado deve ter pelo menos 2 caracteres.",
                     },
                     maxLength: {
                        value: 100,
                        message: "O Estado deve ter no máximo 100 caracteres.",
                     }, 
                  }}
                  render={({ field }) => (
                     <InputText
                     id="state"
                     {...field}
                     className={`w-full ${
                        errors.state ? "p-invalid border-red-500" : ""
                     }`}
                     style={{
                        backgroundColor: "var(--surface-ground)",
                        border: "1px solid var(--surface-border)",
                        padding: "0.5rem",
                        borderRadius: "6px",
                     }}
                     />
                  )}
               />
               {errors.state && (
                  <small className="text-red-400">{errors.state.message}</small>
               )}
               </div>

               {/* Cidade */}
               <div className="flex flex-col gap-1">
               <label htmlFor="city" className="text-sm font-semibold">
                  Cidade
               </label>
               <Controller
                  name="city"
                  control={control}
                  rules={{ 
                     required: "Informe a Cidade",
                     minLength: { 
                        value: 2,
                        message: "A Cidade deve ter pelo menos 2 caracteres.",
                     },
                     maxLength: {
                        value: 100,
                        message: "A Cidade deve ter no máximo 100 caracteres.",
                     },
                   }}
                  render={({ field }) => (
                     <InputText
                     id="city"
                     {...field}
                     className={`w-full ${
                        errors.city ? "p-invalid border-red-500" : ""
                     }`}
                     style={{
                        backgroundColor: "var(--surface-ground)",
                        border: "1px solid var(--surface-border)",
                        padding: "0.5rem",
                        borderRadius: "6px",
                     }}
                     />
                  )}
               />
               {errors.city && (
                  <small className="text-red-400">{errors.city.message}</small>
               )}
               </div>

               {/* Rua */}
               <div className="flex flex-col gap-1">
               <label htmlFor="street" className="text-sm font-semibold">
                  Rua
               </label>
               <Controller
                  name="street"
                  control={control}
                  rules={{ 
                     required: "Informe a Rua",
                     minLength: { 
                        value: 2,
                        message: "A Rua deve ter pelo menos 2 caracteres.",
                     },
                     maxLength: { 
                        value: 100,
                        message: "A Rua deve ter no máximo 100 caracteres.",
                     },
                  }}
                  render={({ field }) => (
                     <InputText
                     id="street"
                     {...field}
                     className={`w-full ${
                        errors.street ? "p-invalid border-red-500" : ""
                     }`}
                     style={{
                        backgroundColor: "var(--surface-ground)",
                        border: "1px solid var(--surface-border)",
                        padding: "0.5rem",
                        borderRadius: "6px",
                     }}
                     />
                  )}
               />
               {errors.street && (
                  <small className="text-red-400">{errors.street.message}</small>
               )}
               </div>

               {/* Complemento */}
               <div className="flex flex-col gap-1">
               <label htmlFor="complement" className="text-sm font-semibold">
                  Complemento
               </label>
               <Controller
                  name="complement"
                  control={control}
                  rules={{
                     maxLength: {
                        value: 200,
                        message: "O Complemento deve ter no máximo 200 caracteres.",
                     }
                  }}
                  render={({ field }) => (
                     <InputText
                     id="complement"
                     {...field}
                     className={`w-full`}
                     style={{
                        backgroundColor: "var(--surface-ground)",
                        border: "1px solid var(--surface-border)",
                        padding: "0.5rem",
                        borderRadius: "6px",
                     }}
                     />
                  )}
               />
               {errors.complement && ( // Adicionado exibição de erro para complemento
                    <small className="text-red-400">{errors.complement.message}</small>
                )}
               </div>

               {/* Botões */}
               <div className="flex w-full justify-between gap-2">
                  <Button
                     label="Cancelar"
                     onClick={handleCancel}
                     type="button"
                     icon="pi pi-times"
                     className="p-button p-component p-button-text"
                  />
                  <Button
                     type="submit"
                     label="Gravar Endereço"
                     icon="pi pi-check"
                     loading={loading || isSubmitting}
                     disabled={loading || isSubmitting}
                  />
               </div>

              </form>
            </div>
         )}
         />
      </div>
   );
};


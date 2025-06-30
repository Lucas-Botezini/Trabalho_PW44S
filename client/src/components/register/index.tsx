import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Password,  } from "primereact/password";
import { Button } from "primereact/button";
import { useRef, useState } from "react";
import type { IUserRegister } from "@/commons/types";
import AuthService from "@/services/auth-service";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

interface RegisterModalProps {
  visible: boolean;
  onHide: () => void;
}

export const RegisterModal = ({visible, onHide}: RegisterModalProps) => {
  const {
    control, handleSubmit, reset, 
    formState: { errors, isSubmitting },
  } = useForm<IUserRegister>({
    defaultValues: { username: "", nickname: "", email: "", password: "" },
  })

  const handleCancel = () => {
    reset(); // limpa todos os campos
    onHide(); // fecha o modal
  };
  
  const { signup } = AuthService;
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: IUserRegister) => { 
    setLoading(true);
    
    try {
      const response = await signup(data);
      if (response.status === 200 && response.data) {
        toast.current?.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Usuário cadastrado com sucesso.",
          life: 3000,
        });
        setTimeout(() => {onHide()}, 1000);
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail: "Falha ao cadastrar usuário.",
          life: 3000,
        });
      }
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Falha ao cadastrar usuário.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toast ref={toast}/>
      <Dialog
        visible={visible}
        modal
        onHide={onHide}
        className="register-modal-dialog"
        content={() => (
          <div className="flex flex-col px-8 py-5" style={{
              borderRadius: "12px",
              backgroundColor: "var(--surface-card)"
          }}>
            <h2 className="mb-2 font-bold text-xl">Registre-se</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                {/* Nome de usuário */}
                <div className="flex flex-col gap-1 mt-2">
                  <label htmlFor="username">
                    Nome do usuário
                  </label>
                  <Controller 
                    name="username"
                    control={control}
                    rules={{ required: "Nome de usuário é obrigatório" }}
                    render={({ field }) => (
                      <InputText
                        id="username"
                        {...field}
                        className={`w-full ${
                          errors.username ? "p-invalid border-red-500" : ""
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
                  {errors.username && (
                    <small className="text-red-400">{errors.username.message}</small>
                  )}
                </div>
                
                {/* Nome de exibição (Nickname) */}
                <div className="flex flex-col gap-1 mt-2">
                  <label htmlFor="nickname">
                    Nome de exibição (Nickname)
                  </label>
                  <Controller 
                    name="nickname"
                    control={control}
                    rules={{ required: "Nickname é obrigatório" }}
                    render={({ field }) => (
                      <InputText
                        id="nickname"
                        {...field}
                        className={`w-full ${
                          errors.nickname ? "p-invalid border-red-500" : ""
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
                  {errors.nickname && (
                    <small className="text-red-400">{errors.nickname.message}</small>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1 mt-2">
                  <label htmlFor="email">
                    Email
                  </label>
                  <Controller 
                    name="email"
                    control={control}
                    rules={{ required: "Email é obrigatório" }}
                    render={({ field }) => (
                      <InputText
                        id="email"
                        {...field}
                        className={`w-full ${
                          errors.email ? "p-invalid border-red-500" : ""
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
                  {errors.email && (
                    <small className="text-red-400">{errors.email.message}</small>
                  )}
                </div>

                {/* Senha */}
                <div className="flex flex-col gap-1 mt-3">
                  <label htmlFor="password" className="text-sm font-semibold">
                    Senha
                  </label>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Informe a senha" }}
                    render={({ field }) => (
                      <Password
                        id="password"
                        {...field}
                        toggleMask
                        feedback={false}
                        inputClassName="w-full"
                        panelClassName="w-full"
                        style={{width: "100%"}}
                        className={`w-full ${
                          errors.password ? "p-invalid border-red-500" : ""
                        }`}
                        inputStyle={{
                          backgroundColor: "var(--surface-ground)",
                          border: "1px solid var(--surface-border)",
                          padding: "0.5rem",
                          borderRadius: "6px",
                        }}
                      />
                    )}
                  />
                  {errors.password && (
                    <small className="text-red-400">{errors.password.message}</small>
                  )}
                </div>

                {/* Botões */}
                <div className="flex align-items-center gap-2 mt-4">
                  <Button
                    type="submit"
                    label="Entrar"
                    icon="pi pi-sign-in"
                    className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                    loading={loading || isSubmitting}
                    disabled={loading || isSubmitting}
                  />
                  <Button
                    label="Cancelar"
                    onClick={handleCancel}
                    type="button"
                    className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                  />
                </div>
            </form>

          </div>
        )}
      >

      </Dialog>
    </div>
  );
};
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import type { IUserLogin, AuthenticationResponse } from "@/commons/types";
import AuthService from "@/services/auth-service";
import { Toast } from "primereact/toast";
import { useAuth } from "@/context/hooks/use-auth";
import { Dialog } from "primereact/dialog";

interface LoginModalProps {
  visible: boolean;
  onHide: () => void;
}

export const LoginModal = ({visible, onHide}: LoginModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IUserLogin>({ defaultValues: { username: "", password: "" } });

  const { login } = AuthService;
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);

  const { handleLogin } = useAuth();

  const handleCancel = () => {
    reset(); // limpa todos os campos
    onHide(); // fecha o modal
  };

  const onSubmit = async (userLogin: IUserLogin) => {
    setLoading(true);
    try {
      const response = await login(userLogin);
      if (response.status === 200 && response.data) {
        const authData = response.data as AuthenticationResponse;
        handleLogin(authData);

        toast.current?.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Login efetuado com sucesso.",
          life: 3000,
        });

        handleCancel();
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail: "Falha ao efetuar login.",
          life: 3000,
        });
      }
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Falha ao efetuar login.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
      <div>
        <Toast ref={toast} />
        <Dialog
          visible={visible}
          modal
          onHide={onHide}
          content={() => (
            <div className="flex flex-col px-8 py-5" style={{
              borderRadius: "12px",
              backgroundColor: "var(--surface-card)"
            }}>
              <h2 className="mb-2 font-bold text-xl">Login</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Usuário */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="username" className="text-sm font-semibold">
                    Usuário
                  </label>
                  <Controller
                    name="username"
                    control={control}
                    rules={{ required: "Informe o nome de usuário" }}
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
                <div className="flex align-items-center gap-2 mt-2">
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

                {/* Link para registro
                <div className="text-center mt-4">
                  <small>
                    Não tem uma conta?{" "}
                    <Link to="/register" className="text-blue-400 hover:underline">
                      Criar conta
                    </Link>
                  </small>
                </div> */}
              </form>
            </div>
          )}
        />
      </div>
  );
};

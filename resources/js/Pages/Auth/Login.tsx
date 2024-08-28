import { FormEventHandler, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import { Head, useForm } from "@inertiajs/react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import InputError from "@/Components/InputError";
import useLocalStorage from "use-local-storage";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useLocalStorage("email", "");
    const [password, setPassword] = useLocalStorage("password", "");
    const [rememberMe, setRememberMe] = useLocalStorage("rememberMe", false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: email || "",
        password: password || "",
        remember: rememberMe,
    });

    const [handleShowPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onError: () => reset("password"),
        });
        const rememberMeCheckbox = document.getElementById(
            "terms"
        ) as HTMLInputElement;
        if (rememberMeCheckbox.checked) {
            setEmail(data.email);
            setPassword(data.password);
            setRememberMe(true);
        } else {
            setEmail("");
            setPassword("");
            setRememberMe(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-dvh">
            <Head title="Log in" />
            <div className="flex flex-col gap-2 w-full justify-center items-center px-5 max-w-md">
                <p className="text-4xl font-semibold">Login Admin</p>
                <form
                    onSubmit={submit}
                    className="flex flex-col gap-6 lg:mt-9 shadow-sm mt-5 p-5 bg-white border border-gray-300 rounded-lg w-full"
                >
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            autoComplete="none"
                            name="email"
                            id="email"
                            type="email"
                            placeholder="JhonDoe@gmail.com"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                type={handleShowPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!handleShowPassword)
                                }
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                            >
                                {handleShowPassword ? (
                                    <EyeIcon size={20} />
                                ) : (
                                    <EyeOffIcon size={20} />
                                )}
                            </button>
                        </div>

                        <InputError message={errors.password} />
                    </div>{" "}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="terms"
                            checked={data.remember}
                            name="remember"
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <Label htmlFor="terms" className="cursor-pointer">
                            Ingat Saya
                        </Label>
                    </div>
                    <Button
                        disabled={processing}
                        type="submit"
                        variant={"blue"}
                    >
                        Sign in
                    </Button>
                </form>
            </div>
        </div>
    );
}

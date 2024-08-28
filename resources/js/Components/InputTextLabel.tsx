import React, { useState, useRef } from "react";
import { Input, InputProps } from "./ui/input";

import { Label } from "./ui/label";
import { CircleAlert } from "lucide-react";

interface InputLabelAdminProps {
    children?: React.ReactNode;
    labelFor: string;
    inputId: string;
    labelText: string;
    inputProps?: InputProps;
    error: string;
    variant?: "wajib" | "optional" | "none";
}

const InputTextLabel: React.FC<InputLabelAdminProps> = ({
    children,
    labelFor,
    inputId,
    labelText,
    inputProps,
    error,
    variant,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <div>
                    <Label
                        variant={variant}
                        className="cursor-pointer"
                        htmlFor={labelFor}
                    >
                        {labelText}
                    </Label>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative w-full">
                        {children}
                        <Input
                            ref={inputRef}
                            className="pl-9"
                            id={inputId}
                            {...inputProps}
                            autoComplete="off"
                        />
                    </div>
                </div>
            </div>
            {error && (
                <p className="text-sm flex items-center gap-2 text-red-600 bg-red-100 p-2 rounded-lg ">
                    <CircleAlert className="w-4 h-4" />
                    <span>{error}</span>
                </p>
            )}
        </div>
    );
};
export default InputTextLabel;

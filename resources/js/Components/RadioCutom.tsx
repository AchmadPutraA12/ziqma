import React, { ChangeEventHandler } from "react";
import { Label } from "./ui/label";

interface GenderSelectorProps {
    selectedGender: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    className?: string;
    title: string;
}
const RadioCustom = ({
    selectedGender,
    title,
    onChange,
    className,
}: GenderSelectorProps) => {
    return (
        <div className="flex flex-col gap-2">
            <Label>{title}</Label>
            <div className={`flex items-center gap-2 ${className}`}>
                <label
                    htmlFor="roll"
                    className={`flex items-center gap-2 border bg-background rounded-lg px-4 py-2 cursor-pointer ${
                        selectedGender === "roll"
                            ? "border-primary"
                            : "border-gray-700"
                    }`}
                >
                    <input
                        type="radio"
                        id="roll"
                        name="gender"
                        className="focus:ring-0 focus:ring-purple-500 focus:ring-offset-0 text-primary"
                        value="roll"
                        checked={selectedGender === "roll"}
                        onChange={onChange}
                    />
                    <span className="text-sm cursor-pointer">roll</span>
                </label>
                <label
                    htmlFor="box"
                    className={`flex items-center gap-2 border bg-background rounded-lg px-4 py-2 cursor-pointer ${
                        selectedGender === "box"
                            ? "border-primary"
                            : "border-gray-700"
                    }`}
                >
                    <input
                        type="radio"
                        id="box"
                        name="gender"
                        className="focus:ring-0 focus:ring-purple-500 focus:ring-offset-0 text-primary"
                        value="box"
                        checked={selectedGender === "box"}
                        onChange={onChange}
                    />
                    <span className="text-sm cursor-pointer">box</span>
                </label>
            </div>
        </div>
    );
};

export default RadioCustom;

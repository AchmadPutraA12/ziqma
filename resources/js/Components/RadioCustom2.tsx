import React, { ChangeEventHandler } from "react";
import { Label } from "./ui/label";

interface GenderSelectorProps {
    selectedGender: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    className?: string;
    title: string;
}
const RadioCustom2 = ({
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
                    htmlFor="2"
                    className={`flex items-center gap-2 border bg-background rounded-lg px-4 py-2 cursor-pointer ${
                        selectedGender === "2"
                            ? "border-primary"
                            : "border-gray-700"
                    }`}
                >
                    <input
                        type="radio"
                        id="2"
                        name="width"
                        className="focus:ring-0 focus:ring-purple-500 focus:ring-offset-0 text-primary"
                        value="2"
                        checked={selectedGender === "2"}
                        onChange={onChange}
                    />
                    <span className="text-sm cursor-pointer">2 m</span>
                </label>
                <label
                    htmlFor="4"
                    className={`flex items-center gap-2 border bg-background rounded-lg px-4 py-2 cursor-pointer ${
                        selectedGender === "4"
                            ? "border-primary"
                            : "border-gray-700"
                    }`}
                >
                    <input
                        type="radio"
                        id="4"
                        name="gender"
                        className="focus:ring-0 focus:ring-purple-500 focus:ring-offset-0 text-primary"
                        value="4"
                        checked={selectedGender === "4"}
                        onChange={onChange}
                    />
                    <span className="text-sm cursor-pointer">4 m</span>
                </label>
            </div>
        </div>
    );
};

export default RadioCustom2;

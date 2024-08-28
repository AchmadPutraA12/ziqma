import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

interface Props {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    id?: string;
    placeholder?: string;
}
export default function TextEditor({
    value,
    id,
    onChange,
    className,
    placeholder,
}: Props) {
    const myColors = ["white"];
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ color: myColors }],
            [{ background: myColors }],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "align",
    ];

    return (
        <>
            <ReactQuill
                className={className + " h-full bg-white"}
                id={id}
                placeholder={placeholder}
                theme="snow"
                modules={modules}
                formats={formats}
                value={value}
                onChange={onChange}
            />
        </>
    );
}

import { useEffect, useMemo, useState } from "react";
import useToggle from "@/hooks/useToggle";
import { IconAngleDown, IconAngleUp } from "../Icons";

function TextSelect({ editor }) {
  const [selectedOption, setSelectedOption] = useState("Paragraph");
  const { node, toggle, setToggle } = useToggle();

  const options = useMemo(
    () => [
      {
        name: "Paragraph",
        action: () => editor.chain().focus().setParagraph().run(),
        isActive: editor.isActive("paragraph"),
      },
      {
        name: "Heading 1",
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: editor.isActive("heading", { level: 1 }),
      },
      {
        name: "Heading 2",
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: editor.isActive("heading", { level: 2 }),
      },
      {
        name: "Heading 3",
        action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: editor.isActive("heading", { level: 3 }),
      },
      {
        name: "Heading 4",
        action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
        isActive: editor.isActive("heading", { level: 4 }),
      },
      {
        name: "Heading 5",
        action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
        isActive: editor.isActive("heading", { level: 5 }),
      },
      {
        name: "Heading 6",
        action: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
        isActive: editor.isActive("heading", { level: 6 }),
      },
    ],
    [editor]
  );

  useEffect(() => {
    editor.isActive("paragraph") && setSelectedOption("Paragraph");
    editor.isActive("heading", { level: 1 }) && setSelectedOption("Heading 1");
    editor.isActive("heading", { level: 2 }) && setSelectedOption("Heading 2");
    editor.isActive("heading", { level: 3 }) && setSelectedOption("Heading 3");
    editor.isActive("heading", { level: 4 }) && setSelectedOption("Heading 4");
    editor.isActive("heading", { level: 5 }) && setSelectedOption("Heading 5");
    editor.isActive("heading", { level: 6 }) && setSelectedOption("Heading 6");
  }, [editor.state.selection, editor]);

  return (
    <div ref={node} className="w-[130px] text-sm font-medium">
      <button
        type="button"
        className="!pl-4 !pr-2 py-2 w-full flex !justify-between rounded-md bg-white border border-gray-300"
        onClick={() => setToggle(!toggle)}
      >
        {selectedOption}
        <span>{toggle ? <IconAngleUp /> : <IconAngleDown />}</span>
      </button>

      <div className="relative">
        {toggle && (
          <div className="absolute w-full mt-1 space-y-0.5 p-0.5 border border-gray-300 bg-white z-30 rounded-md">
            {options.map((option) => (
              <button
                key={option.name}
                type="button"
                className={`w-full !pl-4 flex !justify-start  ${
                  option.isActive
                    ? "bg-gray-300 hover:!bg-gray-300"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  option.action();
                  setSelectedOption(option.name);
                  setToggle(false);
                }}
              >
                {option.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TextSelect;

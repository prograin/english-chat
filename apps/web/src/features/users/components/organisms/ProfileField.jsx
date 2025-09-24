import React from "react";
import Input from "../atoms/Input";
import TextArea from "../atoms/TextArea";
import Select from "../atoms/Select";
import FormField from "../molecules/FormField";
import CheckboxGroup from "../molecules/CheckboxGroup";

export default function ProfileField({ field, value, onChange }) {
  const fieldValue = value ?? (field.type === "multi-select" ? [] : "");

  const renderField = () => {
    switch (field.type) {
      case "select":
        return (
          <Select
            name={field.name}
            value={fieldValue}
            onChange={onChange}
            options={field.options}
            className="input-glass"
          />
        );
      case "multi-select":
        return (
          <div className="w-full">
            <CheckboxGroup
              name={field.name}
              value={fieldValue}
              onChange={onChange}
              options={field.options}
            />
          </div>
        );
      case "textarea":
        return (
          <TextArea
            name={field.name}
            value={fieldValue}
            onChange={onChange}
            className="input-glass"
          />
        );
      default:
        return (
          <Input
            name={field.name}
            value={fieldValue}
            type={field.type}
            onChange={onChange}
            className="input-glass"
          />
        );
    }
  };

  return <FormField label={field.label}>{renderField()}</FormField>;
}

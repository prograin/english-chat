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
          />
        );
      case "multi-select":
        return (
          <CheckboxGroup
            label={field.label}
            name={field.name}
            value={fieldValue}
            onChange={onChange}
            options={field.options}
          />
        );
      case "textarea":
        return <TextArea name={field.name} value={fieldValue} onChange={onChange} />;
      default:
        return <Input name={field.name} value={fieldValue} type={field.type} onChange={onChange} />;
    }
  };

  if (field.type === "multi-select") return renderField();

  return <FormField label={field.label}>{renderField()}</FormField>;
}

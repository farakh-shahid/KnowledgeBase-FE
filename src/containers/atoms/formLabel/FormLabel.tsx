import { colors } from "@/assets/colors";
import { FormLabelProps } from "@/interfaces/formLabelProps";
import React from "react";

const FormLabel = (props: FormLabelProps) => {
  return (
    <p
      style={{
        color: props.color ? props.color : colors.bg.Tarawera,
        fontSize: props.fontSize ? props.fontSize : "1rem",
        marginTop: "1vh",
        textAlign: "center",
        fontWeight: "400",
        lineHeight: "24px",
        fontFamily: "Helvetica",
        textDecoration: "none",
      }}
    >
      {props.label}
    </p>
  );
};

export default FormLabel;

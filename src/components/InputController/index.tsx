import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form"
import { Input, InputProps } from "../Input"

interface Props<T extends FieldValues>
    extends Omit<InputProps, "value" | "onChangeText" | "error"> {
    control: Control<T>
    name: Path<T>
    errors?: FieldErrors<T>
}

export const InputController = <T extends FieldValues>({
    name,
    control,
    errors,
    ...rest
}: Props<T>) => {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value, onBlur }, fieldState: { error }, formState: { isSubmitting } }) => (
                <Input
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    error={error?.message}
                    isDisable={isSubmitting || rest.isDisable}
                    {...rest}
                />
            )}
        />
    )
}
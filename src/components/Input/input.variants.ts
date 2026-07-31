import { tv, VariantProps} from "tailwind-variants"

export const inputVariants = tv({
    slots: {
        container: "w-full my-4",
        wrapper: "flex-row items-center border-b border-gray-200 pb-2",
        input: "bg-transparent text-gray-500 text-base flex-1",
        label: "text-xs text-gray-300 mb-3 font-semibold",
        error: "text-sm text-danger mt-1"
    },
    variants: {
        isFocused: {
            true: {},
        },
        isError: {
            true: {}
        },
        isDisable: {
            true: {}
        }
    },
    defaultVariants: {
        isDisable: false,
        isError: false,
        isFocused: false,
    }
})

export type InputVariantsProps = VariantProps<typeof inputVariants>
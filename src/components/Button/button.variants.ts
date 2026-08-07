import { tv, VariantProps } from "tailwind-variants"

export enum ButtonVariantsEnum {
    FILLED = "filled",
    OUTLINE = "outline"
}

export const buttonVariants = tv({
    slots: {
        base: "w-full h-[48px] rounded-[10px] border px-4 flex-row items-center",
        text: "font-semibold text-base",
        icon: ""
    },
    variants: {
        hasIcon: {
            true: {
                base: "justify-between"
            },
            false: {
                base: "justify-center"
            }
        },
        isDisabled: {
            true: {
                base: "opacity-50"
            },
        },
        isLoading: {
            true: {
                base: "opacity-60"
            },
        },
        variant: {
            filled: {
                base: "bg-purple-base border-purple-base",
                text: "text-white"
            },
            outline: {
                base: "bg-transparent border-purple-base",
                text: "text-purple-base"
            }
        }

    },
    defaultVariants: {
        isDisabled: false,
        hasIcon: false,
        isLoading: false,
        variant: ButtonVariantsEnum.FILLED
    }
})

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>
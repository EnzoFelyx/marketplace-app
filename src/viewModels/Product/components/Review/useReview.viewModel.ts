import { useCreateCommentMutation } from "@/shared/queries/comments/use-create-comment.mutation"
import { useGetUserCommentQuery } from "@/shared/queries/comments/use-get-user-comment.query"
import { useUpdateCommentMutation } from "@/shared/queries/comments/use-update-comment.mutation"
import { useBottomSheetStore } from "@/shared/store/bottomsheet-store"
import { useEffect, useState } from "react"
import { Toast } from "toastify-react-native"

interface Props {
    content: string
    rating: number
    isEditing: boolean
    commentId?: number
}

const initialFormValue: Props = {
    content: "",
    isEditing: false,
    rating: 0,
    commentId: undefined
}

export const useReview = (productId: number) => {

    const [ratingForm, setRatingForm] = useState(initialFormValue)

    const { close: closeBottomSheet } = useBottomSheetStore()

    const createCommentMutation = useCreateCommentMutation(productId)

    const updateCommentMutation = useUpdateCommentMutation(productId)

    const handleFormSubmit = async () => {
        if (ratingForm.rating === 0) {
            Toast.warn("Por favor, selecione uma nota.", "top")
            return
        }

        if (!ratingForm.content.trim()) {
            Toast.warn("Por favor, escreva um comentário.", "top")
            return
        }

        const { isEditing, ...FormData } = ratingForm

        if (isEditing) {
            updateCommentMutation.mutate({
                ...FormData,
                commentId: FormData.commentId!,
            })
        } else {
            createCommentMutation.mutate({
                content: FormData.content,
                productId,
                rating: FormData.rating
            })
        }
        closeBottomSheet()
    }

    const {
        data: userComment,
        isLoading: LoadingUserComment
    } = useGetUserCommentQuery(productId)

    const handleRatingChange = (rating: number) => {
        setRatingForm((prevData) => ({ ...prevData, rating }))
    }

    const handleContentChange = (content: string) => {
        setRatingForm((prevData) => ({ ...prevData, content }))
    }

    useEffect(() => {
        if (userComment && userComment.comment) {
            setRatingForm({
                content: userComment.comment.content,
                rating: userComment.rating,
                isEditing: true,
                commentId: userComment.comment.id
            })
        } else {
            setRatingForm(initialFormValue)
        }
    }, [userComment])

    const isLoading = createCommentMutation.isPending || updateCommentMutation.isPending

    return {
        handleContentChange,
        handleRatingChange,
        ratingForm,
        LoadingUserComment,
        handleFormSubmit,
        isLoading,
        closeBottomSheet
    }
}
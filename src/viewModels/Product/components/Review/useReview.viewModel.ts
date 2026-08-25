import { useGetUserCommentQuery } from "@/shared/queries/comments/use-get-user-comment.query"
import { useEffect, useState } from "react"

interface Props {
    content: string
    rating: number
    isEditing: boolean
}

const initialFormValue: Props = {
    content: "",
    isEditing: false,
    rating: 0
}

export const useReview = (productId: number) => {

    const [ratingForm, setRatingForm] = useState(initialFormValue)

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
        if (userComment && userComment.content && userComment.rating) {
            setRatingForm({
                content: userComment.content,
                rating: userComment.rating,
                isEditing: true
            })
        } else {
            setRatingForm(initialFormValue)
        }
    }, [userComment])

    return {
        handleContentChange,
        handleRatingChange,
        ratingForm,
        LoadingUserComment
    }
}
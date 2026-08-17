import { memo } from "react"
import { HomeHeader } from "../Header"
import { SearchInput } from "../SearchInput"

export const RenderHeader = memo(({
    searchInputText,
    setSearchInputText
}: {
    searchInputText: string,
    setSearchInputText: (text: string) => void
}
) => (
    <>
        <HomeHeader />
        <SearchInput
            setSearchInputText={setSearchInputText}
            inputValue={searchInputText}
        />
    </>
))
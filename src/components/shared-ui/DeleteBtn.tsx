import { TrashIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { Button } from '../ui/button'
interface DeleteBtnProps {
    onClick: () => Promise<void>
}

const DeleteBtn = ({ onClick }: DeleteBtnProps) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const deleteClickHandler = async () => {
        setIsDeleting(true)
        await onClick()
        setIsDeleting(false)
    }
    return (
        <Button disabled={isDeleting} onClick={deleteClickHandler}>
            Delete
            <TrashIcon className={`ml-2 h-4 w-4 ${isDeleting ? 'animate-ping' : ''} `} /></Button>
    )
}

export default DeleteBtn
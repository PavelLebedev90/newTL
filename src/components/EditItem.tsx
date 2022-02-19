import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@mui/material';
import {RequestStatusType} from '../reducers/App-reducer';

type EditItemType = {
    title: string
    editStateItem: (title: string) => void
    entityStatus?: RequestStatusType
}

const EditItem = React.memo((props: EditItemType) => {
    const [edit, setEdit] = useState(true)
    const [title, setTitle] = useState(props.title)
    let [error, setError] = useState('')
    const onDoubleClick = () => {
        if (props.entityStatus === 'loading') {
            return
        }
        setEdit(!edit)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title.trim()) {
            props.editStateItem(title.trim())
            setEdit(!edit)
        } else {
            setError('value not valid')
        }

    }

    return (
        edit || props.entityStatus === 'loading' ?
            <span onDoubleClick={onDoubleClick}>
                {
                    props.entityStatus === 'loading'
                        ?
                        'loading...'
                        :
                        props.title
                }
            </span>
            : <TextField className="editItem"
                         variant={'outlined'}
                         value={title}
                         onChange={onChangeHandler}
                         onKeyPress={onKeyPress}
                         placeholder={error}
                         autoFocus
            />
    );
});

export default EditItem;

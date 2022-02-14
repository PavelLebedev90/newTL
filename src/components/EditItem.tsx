import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
type EditItemType = {
    title: string
    editStateItem: (title:string)=>void
}

const EditItem = React.memo ((props:EditItemType) => {
    const [edit, setEdit] = useState(true)
    const [title, setTitle] = useState(props.title)
    let [error, setError] = useState('')
    const onDoubleKlick = ()=>{
        setEdit(!edit)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }
    const onKeyPress = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && title.trim()){
            props.editStateItem(title.trim())
            setEdit(!edit)
        }else{
            setError('value not valid')
        }

    }

    return (
        edit?
        <span onDoubleClick={onDoubleKlick}>{props.title}</span>
           : <input className="editItem"
                value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPress}
                    placeholder={error}
                    autoFocus
            />
    );
});

export default EditItem;

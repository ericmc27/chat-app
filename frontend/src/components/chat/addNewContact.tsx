import {React, sendRequest, sendFriendRequest} from "../../imports"

const AddNewContact: React.FC = () => {
  const [tag, setTag] = React.useState<string>("@")

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.currentTarget.value)
  }

  const submitTag = ()=>{
    sendFriendRequest(tag)
  }

  return (
    <>
      <h1 className="text-2xl mb-3">Add someone new to your world</h1>

      <div className="flex gap-3">
        <input
          id="tag"
          type="text"
          className="border border-white rounded w-100 p-2"
          onChange={handleTagChange}
          value={tag}
        />
        <img src={sendRequest} className="h-12 w-12 hover:cursor-pointer" onClick={submitTag}/>
      </div>
    </>
  );
};

export default AddNewContact;

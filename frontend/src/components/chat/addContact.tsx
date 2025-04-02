import sendRequest from "../../assets/icons8-add-48.png"

const AddContact = () => {
  return (
    <>
      <h1 className="text-2xl mb-3">Add someone new to your world</h1>

      <div className="flex gap-3">
        <input
          type="text"
          className="border border-white rounded w-100 p-2"
          placeholder="Add someone new by inputting their tag"
        />
        <img src={sendRequest} className="h-12 w-12" />
      </div>
    </>
  );
};

export default AddContact;

const ChatDetails = ({ selectedChat }) => {
  if (!selectedChat)
    return <div className="w-1/4 bg-base-100 p-4">No chat selected</div>;

  return (
    <div className="w-1/4 bg-base-100 p-4 rounded-md shadow-lg bg-second">
      <h2 className="text-xl font-bold mb-4">User Info</h2>
      <div className="avatar mb-4">
        <div className="w-20 rounded-full">
          <img src={selectedChat.avatar} alt={selectedChat.name} />
        </div>
      </div>
      <div className="text-lg font-semibold">{selectedChat.name}</div>

      <h3 className="text-md font-bold mt-6 mb-2">Media</h3>
      <div className="grid grid-cols-3 gap-2">
        <img
          className="w-full h-auto rounded"
          src="https://placekitten.com/100/100"
          alt="Media"
        />
        <img
          className="w-full h-auto rounded"
          src="https://placekitten.com/101/100"
          alt="Media"
        />
        <img
          className="w-full h-auto rounded"
          src="https://placekitten.com/102/100"
          alt="Media"
        />
      </div>
    </div>
  );
};

export default ChatDetails;

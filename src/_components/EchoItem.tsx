import { FaBookmark, FaReply, FaStar } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";

function EchoItem() {
  return (
    <div>
      <span>test</span>
      <div>
        <button>
          <FaReply />
        </button>
        <button>
          <BiRepost />
        </button>
        <button>
          <FaStar />
        </button>
        <button>
          <FaBookmark />{" "}
        </button>
      </div>
    </div>
  );
}

export default EchoItem;

import React from "react";

const DebrisSidebar: React.FC = () => (
  <div>
    <h2 className="text-lg font-semibold mb-2">
      Leaf and Yard Debris Collection
    </h2>
    <ul className="list-disc ml-4 mb-4">
      <li>Shows debris collection zones</li>
      <li>
        Based on data from{" "}
        <a
          href="https://www.townofbrighton.org/516/Leaf-and-Yard-Debris-Collection"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800 transition-colors"
        >
          here
        </a>
      </li>
      {/* <li>Click on a zone for more info</li> */}
    </ul>
    {/* <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">Upcoming Areas</h3>
      <div className="flex flex-col gap-2">
        <div>
          <span className="font-medium">Next:</span> <span>areas 2-4</span>
        </div>
        <div>
          <span className="font-medium">On Deck:</span> <span>areas 2-4</span>
        </div>
      </div>
    </div> */}
  </div>
);

export default DebrisSidebar;

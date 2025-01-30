export default function Tracker() {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div>
          <h2 className="text-lg font-bold tracker text-center">
            Tracker
          </h2>
          <div className="tracker-box">
            <div className="">
              <h3 className="text-base font-semibold">Titles</h3>
              <p className="text-sm text-gray-600">Sample Title</p>
            </div>

            <div className="">
              <h3 className="text-base font-semibold">Date</h3>
              <p className="text-sm text-gray-600">01/30/2025</p>
            </div>

            <div className="">
              <h3 className="text-base font-semibold">Time</h3>
              <p className="text-sm text-gray-600">10:00 AM</p>
            </div>

            <div className="">
              <h3 className="text-base font-semibold">Expert Name</h3>
              <p className="text-sm text-gray-600">John Doe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { createSignal, onCleanup } from "solid-js";

function BookingForm() {
    const [bookingList, setBookingList] = createSignal<{ vehicle: string; worker: string }[]>([]);
    const [selectedVehicle, setSelectedVehicle] = createSignal("SWB");
    const [selectedWorker, setSelectedWorker] = createSignal("1 Person");

    // Function to handle adding the vehicle and worker to the list
    function handleAdd() {
        setBookingList([...bookingList(), { vehicle: selectedVehicle(), worker: selectedWorker() }]);
    }

    // Function to handle deleting a vehicle and worker from the list
    function handleDelete(index: number) {
        setBookingList((prevList) => prevList.filter((_, i) => i !== index));
    }

    // Cleanup the signals when the component is unmounted
    onCleanup(() => {
        setSelectedVehicle(""); // Reset selectedVehicle when the component is unmounted
        setSelectedWorker(""); // Reset selectedWorker when the component is unmounted
    });

    // Function to handle submitting the form
    function handleSubmit() {
        // Create a new FormData instance
        const formData = new FormData();

        // Add the bookingList to the formData
        formData.append("bookingList", JSON.stringify(bookingList()));

        // Log the formData to the console
        console.log(formData);
    }

    return (
        <div class="mt-12 py-5 px-5">

            <h1 class="text-3xl font-bold text-center pb-8">Book a mover</h1>

            <span class="flex pb-2 text-white">Your details</span>
            <div class="flex gap-x-3 pb-3">
                <input
                    type="text"
                    name="Name"
                    placeholder="Name"
                    class="input input-bordered input-primary w-full"
                />
            </div>
            <div class="pb-3">
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    class="input input-bordered input-primary w-full basis-1/2"
                />
            </div>
            <div class="pb-3">
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    class="input input-bordered input-primary w-full basis-1/2"
                />
            </div>
            <div class="divider"></div>

            <span class="flex pb-2 text-white">Moving from</span>
            <div class="flex gap-x-3 pb-3">
                <input
                    type="text"
                    name="door-number-from"
                    placeholder="Door number"
                    class="input input-bordered input-primary w-full basis-1/3"
                />
                <input
                    type="text"
                    name="postcode-from"
                    placeholder="Postcode to"
                    class="input input-bordered input-primary w-full"
                />
            </div>
            <div class="divider"></div>

            <span class="flex pb-2 text-white">Moving to</span>
            <div class="flex gap-x-3 pb-3">
                <input
                    type="text"
                    name="door-number-to"
                    placeholder="Door number"
                    class="input input-bordered input-primary w-full basis-1/3"
                />
                <input
                    type="text"
                    name="postcode-to"
                    placeholder="Postcode to"
                    class="input input-bordered input-primary w-full"
                />
            </div>
            <div class="divider"></div>

            <span class="flex pb-2">Add vehicle</span>
            <div class="flex gap-x-3">
                <div class="flex items-center gap-x-3">
                    <label class="label">
                        <span class="label-text">SWB</span>
                    </label>
                    <input
                        type="radio"
                        name="radio-2"
                        class="radio radio-primary  bg-white"
                        onChange={() => setSelectedVehicle("SWB")}
                        value="SWB"
                        checked
                    />
                </div>
                <div class="flex items-center gap-x-3">
                    <label class="label">
                        <span class="label-text">LWB</span>
                    </label>
                    <input
                        type="radio"
                        name="radio-2"
                        class="radio radio-primary bg-white"
                        onChange={(e) => setSelectedVehicle('LWB')}
                    />
                </div>
                <div class="flex items-center gap-x-3">
                    <label class="label">
                        <span class="label-text">Luton</span>
                    </label>
                    <input type="radio"
                        name="radio-2"
                        class="radio radio-primary bg-white"
                        onChange={(e) => setSelectedVehicle('Luton')}
                    />
                </div>
                <select
                    class="select select-bordered w-full max-w-xs"
                    value={selectedWorker()}
                    onChange={(e) => setSelectedWorker(e.target.value)}
                >
                    <option selected>1 Person</option>
                    <option>Driver + 1</option>
                    <option>Driver + 2</option>
                </select>
                <button class="btn btn-primary" onClick={handleAdd}>
                    Add
                </button>

            </div>
            <div class="bg-white/25 rounded-lg mt-5">
                <table class="table">
                    {/* Display the selected vehicles and workers */}
                    <thead>
                        <tr>

                            <th>Vehicle</th>
                            <th>Porters</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {bookingList().map((booking, index) => (
                        <tr key={index}>
                            <td>{booking.vehicle}</td>
                            <td>{booking.worker}</td>
                            <td><button class="btn btn-error btn-xs" onClick={() => handleDelete(index)}>Delete</button></td>
                        </tr>

                    ))}
                </table>


            </div>
            <div class="flex w-full pt-8">
                <button class="btn btn-primary mx-auto" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>


    );
}

export default BookingForm;
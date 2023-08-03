import { createSignal, onCleanup } from "solid-js";

function BookingForm() {
    const [bookingList, setBookingList] = createSignal<{ vehicle: string; worker: string }[]>([]);
    const [selectedVehicle, setSelectedVehicle] = createSignal("Transit");
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


    function handleSubmit(event) {
        event.preventDefault(); // prevent the default form submission behavior

        // Create a new FormData instance
        const formData = new FormData(event.target);

        const name = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone");

        // Collect the rest of the form data
        const body = `Door number from: ${formData.get("door-number-from")}, ` +
            `Postcode from: ${formData.get("postcode-from")}, ` +
            `Door number to: ${formData.get("door-number-to")}, ` +
            `Postcode to: ${formData.get("postcode-to")}, ` +
            `Date: ${formData.get("date")}, ` +
            `Additional info: ${formData.get("additional-information")}, ` +
            `Booking list: ${bookingList().map(booking => `Vehicle: ${booking.vehicle}, Worker: ${booking.worker}`).join(", ")}`;

        // Prepare the data to send
        const dataToSend = {
            name: name.toString(),
            email: email.toString(),
            phone: phone.toString(),
            source: "Khider mover",
            body: body
        };

        // Send a POST request with the form data
        fetch('https://stunning-great-basin-69740-86f00b00c8ea.herokuapp.com/leads', {  // replace with your server endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
        }).then(response => {
            if (response.ok) {
                // The request was successful
                return response.json();
            } else {
                // The request failed
                throw new Error('Something went wrong');
            }
        }).then(data => {
            // Here you can handle the response data
            console.log(data);
        }).catch(error => {
            // Here you can handle errors
            console.log(error);
        });
    }





    return (

        <div class="mt-12 py-5 px-5">
            <form onSubmit={handleSubmit}>


                <h1 class="text-3xl font-bold text-center pb-8">Book a mover</h1>

                <span class="flex pb-2">Your details</span>
                <div class="flex gap-x-3 pb-3">
                    <input
                        type="text"
                        name="name"
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

                <span class="flex pb-2">Moving from</span>
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

                <span class="flex pb-2">Moving to</span>
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
                <div>
                    <input
                        type="date"
                        name="date"
                        placeholder="Date"
                        class="input input-bordered input-primary w-full text-neutral-content placeholder:text-base-200"
                    />
                </div>
                <div class="divider"></div>
                <span class="flex pb-2">More info</span>
                <div>
                    <textarea
                        name="additional-information"
                        placeholder="Additional information / List of items"
                        class="textarea textarea-bordered textarea-primary w-full"
                    ></textarea>
                </div>
                <div class="divider"></div>

                <span class="flex pb-2">Add vehicle</span>
                <div class="flex gap-x-3">
                    <div class="flex items-center gap-x-3">
                        <label class="label">
                            <span class="label-text">Transit</span>
                        </label>
                        <input
                            type="radio"
                            name="radio-2"
                            class="radio radio-primary  bg-white"
                            onChange={() => setSelectedVehicle("Transit")}
                            value="Transit"
                            checked
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
                    <button type="submit" class="btn btn-primary mx-auto">
                        Submit
                    </button>
                </div>
            </form>

        </div>


    );
}

export default BookingForm;
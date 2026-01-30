import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Enrollment({ enrollments, setEnrollments }) {
  const [complete, setComplete] = useState(false);

  /*function increaseQty(item) {
    if (item.course.stock === item.qty) return;
    const updatedItems = enrollments.map((i) => {
      if (i.course.id === item.course.id) i.qty++;
      return i;
    });
    setEnrollments(updatedItems);
  }

  function decreaseQty(item) {
    if (item.qty > 1) {
      const updatedItems = enrollments.map((i) => {
        if (i.course.id === item.course.id) i.qty--;
        return i;
      });
      setEnrollments(updatedItems);
    }
  }
*/

  function confirmEnrollmentHandler() {
    fetch(process.env.REACT_APP_API_URL + "/enrollments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enrollments),
    }).then(() => {
      setEnrollments([]);
      setComplete(true);
      toast.success("Enrollment Successful!");
    });
  }

  return enrollments.length > 0 ? (
    <Fragment>
      <div className="container container-fluid">
        <h2 className="mt-5">
          Your Enrollments: <b>{enrollments.length} courses</b>
        </h2>
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {enrollments.map((item) => (
              <Fragment key={item.course.id}>
                <hr />
                <div className="enrollment-item">
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item.course.image}
                        alt={item.course.title}
                        height="90"
                        width="115"
                      />
                    </div>

                    <div className="col-5 col-lg-3">
                      <Link to={`/course/${item.course.id}`}>
                        {item.course.title}
                      </Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p>${item.course.price}</p>
                    </div>
                    
                    

                   
                  </div>
                </div>
              </Fragment>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="enrollment_summary">
              <h4>Enrollment Summary</h4>
              <hr />
              <p>
                Total Courses:{" "}
                <span className="order-summary-values">
                  {enrollments.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              </p>
              <p>
                Total Cost:{" "}
                <span className="order-summary-values">
                  ₹
                  {Number(
                    enrollments.reduce(
                      (acc, item) => acc + item.course.price * item.qty,
                      0
                    )
                  ).toFixed(2)}
                </span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                onClick={confirmEnrollmentHandler}
                className="btn btn-primary btn-block"
              >
                Confirm Enrollment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : !complete ? (
    <h2 className="mt-5">You have not enrolled in any courses!</h2>
  ) : (
    <Fragment>
      <h2 className="mt-5">Enrollment Complete!</h2>
      <p>Your enrollment has been successfully placed.</p>
    </Fragment>
  );
}

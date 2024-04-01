import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { addReview, loadReviews, removeReview } from "../store/actions/review.actions"
import { loadUsers } from "../store/actions/user.actions"
import { userService } from "../services/user.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { Link } from "react-router-dom"




export function Reviews({ toy }) {
  const users = useSelector(storeState => storeState.userModule.users)
  const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
  const reviews = useSelector(storeState => storeState.reviewModule.reviews)

  const [reviewToEdit, setReviewToEdit] = useState({ txt: '', aboutUserId: '' })


  useEffect(() => {
    loadReviews()
    loadUsers()
  }, [loggedInUser])

  const handleChange = ev => {
    const { name, value } = ev.target
    setReviewToEdit({ ...reviewToEdit, [name]: value })
  }

  const onAddReview = async ev => {
    ev.preventDefault()
    if (!reviewToEdit.txt || !reviewToEdit.aboutUserId) return alert('All fields are required')
    try {

      await addReview(reviewToEdit)
      showSuccessMsg('Review added')
      setReviewToEdit({ txt: '', aboutUserId: '' })
    } catch (err) {
      console.log('Cannot add review:', err)
      showErrorMsg('Cannot add review')
    }
  }

  const onRemove = async reviewId => {
    try {
      await removeReview(reviewId)
      showSuccessMsg('Review removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  function canRemove(review) {
    if (!loggedInUser) return false
    return review.byUser._id === loggedInUser._id || loggedInUser.isAdmin
  }

  return (
    <div className="review-index">
      <h1>Reviews</h1>
      {reviews && <ul className="review-list clean-list">
        {reviews.map(review => (
          <li key={review._id}>

            <section className="review-details">
              <p>
                About   :
                <Link to={`/user/${review.aboutUser._id}`}>
                  {review.aboutUser.fullname}
                </Link>
              </p>
              <p>
                By   :
                <Link to={`/user/${review.byUser._id}`}>
                  {review.byUser.fullname}
                </Link>
              </p>
            </section>

            <h3><pre>{review.txt}</pre></h3>

            {canRemove(review) &&
              <button className='btn' onClick={() => onRemove(review._id)}>X</button>}
          </li>
        ))}
      </ul>}
      {users && loggedInUser &&
        <form onSubmit={onAddReview}>
          <select
          className='btn'
            onChange={handleChange}
            value={reviewToEdit.aboutUserId}
            name="aboutUserId"
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.fullname}
              </option>
            ))}
          </select>
          <textarea
            name="txt"
            onChange={handleChange}
            value={reviewToEdit.txt}
          ></textarea>
          <button className='btn'>Add</button>
        </form>}
      <hr />
    </div>
  )
}
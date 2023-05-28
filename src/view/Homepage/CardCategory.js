import { Link} from "react-router-dom";
import data from '../Detail/data.json'

export default function CardCategory() {
    <div className="row mb-5">
    {data.categories.map(category => 
      <div className="col-md-6 col-lg-3">
        <Link to="category/">
        <CardCategory
          thumb_src = {category.thumb_src}
          title = {category.title}
        />
        </Link>
      </div>
    )}
  </div>

}
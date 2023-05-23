import Typography from '@mui/material/Typography';

function ProductOverview(product) {
    return (
        <div className='card'>

          <div className='card-body'>
            <h3 className='card-title'>{product.bids}</h3>
  
          </div>
        </div>

    );
  }
  
  export default ProductOverview;
  
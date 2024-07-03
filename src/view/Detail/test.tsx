'use client'
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CaretRight, X } from 'phosphor-react'; // Add X for the close icon
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation, Scrollbar, Mousewheel } from 'swiper/modules';
import 'swiper/css/bundle';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import SwiperCore from 'swiper/core';
import { useCart } from '@/context/CartContext';
import { useModalCartContext } from '@/context/ModalCartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useModalWishlistContext } from '@/context/ModalWishlistContext';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { ProductType } from '@/type/ProductType';
import Product from '../Product';
import Rate from '@/components/Other/Rate';
SwiperCore.use([Navigation, Thumbs]);

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

interface Props {
  productId: number;
}

interface OptionType {
  id: number;
  name: string;
  values: string[];
}

interface OptionValue {
  value: string;
  option: number;
}

const DescriptionTab: React.FC<{ 
    productMain: ProductType, 
    activeTab: string | undefined, 
    handleActiveTab: (tab: string) => void,
    toggleDrawer: (open: boolean) => () => void  // Add this line
  }> = ({ productMain, activeTab, handleActiveTab, toggleDrawer }) => (
    <div className="desc-tab md:pb-20 pb-10">
      <div className="desc-tab">
        <div className="desc-block pb-6 border-b border-line mt-6">
        <div
          className={`tab-item heading5 flex items-center justify-between cursor-pointer ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => handleActiveTab('description')}
        >
            <span className='heading5'>Description</span>
            <div className="flex items-center">
            <span className='heading5'>Description</span>
            <Icon.CaretDown />
              <X 
                size={18} 
                onClick={toggleDrawer(false)} 
                style={{ cursor: 'pointer', marginLeft: '10px' }} 
              />
            </div>
          </div>
          <div className={`desc-item md:pt-8 pt-5 description ${activeTab === 'description' ? 'open' : ''}`}>
            <div className="right">
              <div className="heading7"><b>About this item</b></div>
              <div className="list-feature">
                <div className="item flex gap-1 text-secondary mt-1">
                  <p>{productMain.title}</p>
                </div>
              </div>
            </div>
            <div className="left md:mt-8 mt-5">
              <div className="heading7"><b>Description</b></div>
              <div className="text-secondary mt-2">{productMain.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

const Default: React.FC<Props> = ({ productId }) => {
  const swiperRef: React.MutableRefObject<any> = useRef();
  const [openPopupImg, setOpenPopupImg] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const [activeVariant, setActiveVariant] = useState<Variant | null>(null);
  const { addToCart, updateCart, cartState } = useCart();
  const { openModalCart } = useModalCartContext();
  const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist();
  const { openModalWishlist } = useModalWishlistContext();
  const [activeTab, setActiveTab] = useState<string | undefined>()
  const [productMain, setProductMain] = useState<ProductType | null>(null);
  const [data, setData] = useState<Array<ProductType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: string}>({});
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (productMain && productMain.variants.length > 0) {
      setActiveVariant(productMain.variants[0]);
    }
  }, [productMain]);
  
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const optionsResponse = await fetch('http://127.0.0.1:8000/api/product-variant-options/');
        const optionsData = await optionsResponse.json();
        
        const valuesResponse = await fetch('http://127.0.0.1:8000/api/product-variant-option-values/');
        const valuesData = await valuesResponse.json();

        const optionsWithValues = optionsData.results.map((option: OptionType) => ({
          ...option,
          values: valuesData.results
            .filter((value: OptionValue) => value.option === option.id)
            .map((value: OptionValue) => value.value)
        }));

        setOptions(optionsWithValues);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

  const getUniqueProductOptions = () => {
    if (!productMain) return [];

    const uniqueOptions = productMain.variants.reduce((acc, variant) => {
      variant.option_values.forEach(optionValue => {
        const option = options.find(o => o.id === optionValue.option);
        if (option) {
          if (!acc[option.name]) {
            acc[option.name] = new Set();
          }
          acc[option.name].add(optionValue.value);
        }
      });
      return acc;
    }, {} as Record<string, Set<string>>);

    return Object.entries(uniqueOptions).map(([name, values]) => ({
      name,
      values: Array.from(values)
    }));
  };

  const productOptions = getUniqueProductOptions();

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({...prev, [optionName]: value}));
    
    // Find the variant that matches the selected options
    const matchingVariant = productMain?.variants.find(variant => 
      variant.option_values.every(optionValue => {
        const optionName = options.find(o => o.id === optionValue.option)?.name;
        return optionName && selectedOptions[optionName] === optionValue.value;
      })
    );

    if (matchingVariant) {
      handleActiveVariant(matchingVariant);
    }
  };

  
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data: ProductType = await response.json();
        setProductMain(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
        // Handle error fetching data
      }
    };

    fetchProductData();
  }, [productId]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/products/');
            const result = await response.json();
            setData(result.results);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch data');
            setLoading(false);
        }
    };
    fetchData();
}, []);
  const handleSwiper = (swiper: SwiperCore) => {
    setThumbsSwiper(swiper);
  };

  const handleActiveVariant = (variant: Variant) => {
    setActiveVariant(variant);
    const imageMapping = variant.image_mappings[0];
    const imageIndex = productMain?.images.findIndex((image) => image.order === imageMapping.image);
    if (imageIndex !== -1) {
      swiperRef.current?.slideTo(imageIndex);
    }
  };

  const handleIncreaseQuantity = () => {
    if (activeVariant) {
      setActiveVariant(prevVariant => ({
        ...prevVariant!,
        quantity: prevVariant!.quantity + 1
      }));
      updateCart(productMain?.id!, activeVariant.quantity, activeVariant.id);
    }
  };

  const handleDecreaseQuantity = () => {
    if (activeVariant && activeVariant.quantity > 1) {
      setActiveVariant(prevVariant => ({
        ...prevVariant!,
        quantity: prevVariant!.quantity - 1
      }));
      updateCart(productMain?.id!, activeVariant.quantity, activeVariant.id);
    }
  };

  const handleAddToCart = () => {
    if (activeVariant && productMain) {
      addToCart({ ...productMain, quantity: activeVariant.quantity, price: activeVariant.price, variantId: activeVariant.id });
      updateCart(productMain.id, activeVariant.quantity, activeVariant.id);
      openModalCart();
    }
  };

  const handleAddToWishlist = () => {
    if (wishlistState.wishlistArray.some((item) => item.id === productMain?.id)) {
      removeFromWishlist(productMain?.id!);
    } else {
      addToWishlist(productMain!);
    }
    openModalWishlist();
  };

  const handleActiveTab = (tab: string) => {
    setActiveTab(prevTab => prevTab === tab ? undefined : tab)
  }

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <>
      {productMain && (
        <>
        <div className="product-detail default">
                  <div className="featured-product underwear md:py-20 py-10">
                      <div className="container flex justify-between gap-y-6 flex-wrap">
                          <div className="list-img md:w-1/2 md:pr-[45px] w-full">
                              <Swiper
                                  slidesPerView={1}
                                  spaceBetween={0}
                                  thumbs={{ swiper: thumbsSwiper }}
                                  modules={[Thumbs]}
                                  className="mySwiper2 rounded-2xl overflow-hidden"
                                  onSwiper={(swiper) => {
                                      swiperRef.current = swiper;
                                  } }
                              >
                                  {productMain.images.map((item, index) => (
                                      <SwiperSlide
                                          key={index}
                                          onClick={() => {
                                              swiperRef.current?.slideTo(index);
                                              setOpenPopupImg(true);
                                          } }
                                      >
                                          <Image
                                              src={item.image}
                                              width={1000}
                                              height={1000}
                                              alt="prd-img"
                                              className="w-full aspect-[4/4] object-cover" />
                                      </SwiperSlide>
                                  ))}
                              </Swiper>
                              <Swiper
                                  onSwiper={(swiper) => {
                                      handleSwiper(swiper);
                                  } }
                                  spaceBetween={0}
                                  slidesPerView={4}
                                  freeMode={true}
                                  watchSlidesProgress={true}
                                  modules={[Navigation, Thumbs]}
                                  className="mySwiper"
                              >
                                  {productMain.images.map((item, index) => (
                                      <SwiperSlide key={index}>
                                          <Image
                                              src={item.thumbnail}
                                              width={1000}
                                              height={1000}
                                              alt="prd-img"
                                              className="w-full aspect-[4/4] object-cover rounded-xl" />
                                      </SwiperSlide>
                                  ))}
                              </Swiper>
                              <div className={`popup-img ${openPopupImg ? 'open' : ''}`}>
                                  <span
                                      className="close-popup-btn absolute top-4 right-4 z-[2] cursor-pointer"
                                      onClick={() => {
                                          setOpenPopupImg(false);
                                      } }
                                  >
                                      <Icon.X className="text-3xl text-white" />
                                  </span>
                                  <Swiper
                                      spaceBetween={0}
                                      slidesPerView={1}
                                      modules={[Navigation, Thumbs]}
                                      navigation={true}
                                      loop={true}
                                      className="popupSwiper"
                                  >
                                      {productMain.images.map((item, index) => (
                                          <SwiperSlide
                                              key={index}
                                              onClick={() => {
                                                  setOpenPopupImg(false);
                                              } }
                                          >
                                              <Image
                                                  src={item.image}
                                                  width={1000}
                                                  height={1000}
                                                  alt="prd-img"
                                                  className="w-full aspect-[4/4] object-cover rounded-xl"
                                                  onClick={(e) => {
                                                      e.stopPropagation(); // prevent
                                                  } } />
                                          </SwiperSlide>
                                      ))}
                                  </Swiper>
                              </div>
                              {!isSmallScreen && (
                             <DescriptionTab productMain={productMain} activeTab={activeTab} handleActiveTab={handleActiveTab} />
                            )}

                          </div>
                          <div className="product-infor md:w-1/2 w-full lg:pl-[15px] md:pl-2">
                              <div className="flex justify-between">
                                  <div>
                                      <div className="heading4 mt-1">{productMain.title}</div>
                                  </div>
                                  <div
                                      className={`add-wishlist-btn w-12 h-12 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white ${wishlistState.wishlistArray.some((item) => item.id === productMain.id) ? 'active' : ''}`}
                                      onClick={handleAddToWishlist}
                                  >
                                      {wishlistState.wishlistArray.some((item) => item.id === productMain.id) ? (
                                          <>
                                              <Icon.Heart size={24} weight="fill" className="text-white" />
                                          </>
                                      ) : (
                                          <>
                                              <Icon.Heart size={24} />
                                          </>
                                      )}
                                  </div>
                              </div>
                              <div className="flex items-center mt-3">
                                  <Rate currentRate={productMain.type} size={14} />
                                  <span className="caption1 text-secondary">(1.234 reviews)</span>
                              </div>
                              <div className="flex items-center gap-3 flex-wrap mt-5 pb-6 border-b border-line">
                                  <div className="product-price heading5">${activeVariant ? activeVariant.price : productMain.price}.00</div>
                                  <div className="w-px h-4 bg-line"></div>
                                  <div className="product-origin-price font-normal text-secondary2">
                                      <del>${productMain.price}</del>
                                  </div>
                                  {productMain.price && (
                                      <div className="product-sale caption2 font-semibold bg-green px-3 py-0.5 inline-block rounded-full">
                                          {Math.floor(
                                              100 -
                                              (parseFloat(activeVariant ? activeVariant.price : productMain.price) /
                                                  parseFloat(productMain.price)) *
                                              100
                                          )}
                                          %
                                      </div>
                                  )}
                              </div>
                              <div className="list-action mt-6">
              {productOptions.map(option => (
                <div key={option.name} className="choose-variant mt-5">
                  <div className="text-title">{option.name}: <span className='text-title color'>{selectedOptions[option.name]}</span></div>
                  <div className="list-variant flex items-center gap-2 flex-wrap mt-3">
                    {option.values.map((value, index) => (
                      <div
                        key={index}
                        className={`variant-item px-3 py-2 rounded-xl duration-300 relative cursor-pointer ${selectedOptions[option.name] === value ? 'active bg-black text-white' : 'bg-gray-100'}`}
                        onClick={() => handleOptionChange(option.name, value)}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            

              <div className="text-title mt-5">Quantity:</div>
                                <div className="choose-quantity flex items-center lg:justify-between gap-5 gap-y-3 mt-3">
                                    <div className="quantity-block md:p-3 max-md:py-1.5 max-md:px-3 flex items-center justify-between rounded-lg border border-line sm:w-[180px] w-[120px] flex-shrink-0">
                                    <span className="cursor-pointer leading-none flex items-center p-2 px-4" onClick={handleDecreaseQuantity}>
                    <Icon.Minus size={14} />
                  </span>
                  <span className="quantity-value text-title px-6">{activeVariant?.quantity || 0}</span>
                  <span className="cursor-pointer leading-none flex items-center p-2 px-4" onClick={handleIncreaseQuantity}>
                    <Icon.Plus size={14} />
                  </span>
                                    </div>
                                    <div onClick={handleAddToCart} className="button-main w-full text-center bg-white text-black border border-black">Add To Cart</div>
                                </div>
                                <div className="button-block mt-5">
                                    <div className="button-main w-full text-center">Buy It Now</div>
                                </div>
                                
              <div className="product-meta mt-6">
                <div className="flex items-center gap-1 mt-3">
                  <div className="text-title">Shop:</div>
                  <div className="caption2 text-secondary font-semibold uppercase">{productMain.shop}</div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <div className="text-title">Categories:</div>
                  <div className="text-secondary">{productMain.category}</div>
                </div>
              </div>
              
              <div className="share-product mt-6">
                <div className="text-title">Share this product:</div>
                <div className="flex items-center gap-2 mt-2">
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Icon.FacebookLogo size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Icon.TwitterLogo size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Icon.InstagramLogo size={20} />
                  </a>
                </div>
                <br></br>
                {isSmallScreen && (
          <>
                                    <div
                                        className={`tab-item heading5 flex items-center justify-between cursor-pointer`}
                                        onClick={toggleDrawer(true)}
                                    >
                                        <span className='heading5'>Description</span>
                                        <Icon.CaretRight />
                                    </div>
            
            <SwipeableDrawer
              anchor="bottom"
              open={openDrawer}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
              swipeAreaWidth={drawerBleeding}
              disableSwipeToOpen={false}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <StyledBox
                sx={{
                  position: 'absolute',
                  top: -drawerBleeding,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  visibility: 'visible',
                  right: 0,
                  left: 0,
                }}
              >
                <Puller />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
      <Typography sx={{ p: 2, color: 'text.secondary' }}>Description</Typography>
      <X size={24} onClick={toggleDrawer(false)} style={{ cursor: 'pointer' }} />
    </div>
              </StyledBox>
              <StyledBox
                sx={{
                  px: 2,
                  pb: 2,
                  height: '100%',
                  overflow: 'auto',
                }}
              >
                   <DescriptionTab 
      productMain={productMain} 
      activeTab={activeTab} 
      handleActiveTab={handleActiveTab} 
      toggleDrawer={toggleDrawer}  // Add this line
    />
              </StyledBox>
            
            </SwipeableDrawer>
          </>
        )}
              </div>
         
            </div>
                          </div>
                      </div>
                  </div>
              </div>
              

              <div className="featured-product border-t border-line py-6 md:py-14">
                      <div className="container">
                          <div className="flex justify-between flex-wrap items-center">
                              <div className="heading3">Related Products</div>
                              <button className="flex items-center caption1 text-primary font-semibold uppercase">View all <Icon.CaretRight size={16} weight="bold" /></button>
                          </div>
                          <div className="mt-6 md:mt-14">
                              <Swiper
                                  spaceBetween={20}
                                  slidesPerView={2}
                                  breakpoints={{
                                      768: {
                                          slidesPerView: 2
                                      },
                                      1024: {
                                          slidesPerView: 4
                                      },
                                  }}
                                  loop={true}
                                  modules={[Scrollbar, Mousewheel]}
                                  scrollbar={{ draggable: true }}
                                  mousewheel={{ forceToAxis: true }}
                                  className="list-related-product"
                              >
                                  {/* Assuming `data` is an array of products */}
                                  {data?.map((product, index) => (
                                      <SwiperSlide key={index}>
                                          <Product data={product} />
                                      </SwiperSlide>
                                  ))}
                              </Swiper>
                          </div>
                      </div>
                  </div></>
      
      )}
    </>
  );
};

export default Default;

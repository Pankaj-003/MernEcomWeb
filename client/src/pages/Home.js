import React, { useEffect, useState, useMemo } from 'react';
import Layout from '../components/Layout/Layout'
import 'jquery-ui-dist/jquery-ui';
import $ from 'jquery';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Price";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
const Home = () => {
    // button
    const [price, setPrice] = useState(null);

    const handleClick = (value) => {
      setPrice(value);
    };
    // ======
    const navigate = useNavigate();
    const [cart, setCart] = useCart()
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);
    //get products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //getTOtal COunt
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // filter by cat
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post("/api/v1/product/product-filters", {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    const SlideShow = ({ divs, slideDuration, currentIndex }) => {
        return (
          <div className="slide-container">
            {divs.map((div, index) => (
              <div
                key={index}
                className={`slide ${index === currentIndex ? 'active' : ''}`}
              >
                {div}
              </div>
            ))}
          </div>
        );
      };
      
 
        const slideDuration = 2000;
        const [currentIndex, setCurrentIndex] = useState(0);
      
        const divs = useMemo(
          () => [
            // Your div elements here
            <div className="top_product">
            <div className="row">
                <div className="col-lg-6">
                    <div className="product_img">
                        <img src="images/index/pd_right1.jpg" className="img-fluid w-100"
                            alt="pd_right1" />
                    </div>
                </div>
                <div className="col-lg-6 align-self-center">
                    <div className="product_text">
                        <a href="/">Kitchen Cooker1</a>
                        <div className="review">
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                        </div>
                        <h5>$250.68</h5>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="product_img">
                        <img src="images/index/pd_right1.jpg" className="img-fluid w-100"
                            alt="pd_right1" />
                    </div>
                </div>
                <div className="col-lg-6 align-self-center">
                    <div className="product_text">
                        <a href="/">Kitchen Cooker2</a>
                        <div className="review">
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                        </div>
                        <h5>$250.68</h5>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="product_img">
                        <img src="images/index/pd_right1.jpg" className="img-fluid w-100"
                            alt="pd_right1" />
                    </div>
                </div>
                <div className="col-lg-6 align-self-center">
                    <div className="product_text">
                        <a href="/">Kitchen Cooker3</a>
                        <div className="review">
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                        </div>
                        <h5>$250.68</h5>
                    </div>
                </div>
            </div>
        </div>,
            <div className="top_product">
            <div className="row">
                <div className="col-lg-6">
                    <div className="product_img">
                        <img src="images/index/pd_right1.jpg" className="img-fluid w-100"
                            alt="pd_right1" />
                    </div>
                </div>
                <div className="col-lg-6 align-self-center">
                    <div className="product_text">
                        <a href="/">Kitchen Cooker4</a> 
                        <div className="review">
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                        </div>
                        <h5>$250.68</h5>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="product_img">
                        <img src="images/index/pd_right1.jpg" className="img-fluid w-100"
                            alt="pd_right1" />
                    </div>
                </div>
                <div className="col-lg-6 align-self-center">
                    <div className="product_text">
                        <a href="/">Kitchen Cooker5</a>
                        <div className="review">
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                        </div>
                        <h5>$250.68</h5>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="product_img">
                        <img src="images/index/pd_right1.jpg" className="img-fluid w-100"
                            alt="pd_right1" />
                    </div>
                </div>
                <div className="col-lg-6 align-self-center">
                    <div className="product_text">
                        <a href="/">Kitchen Cooker6</a>
                        <div className="review">
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                        </div>
                        <h5>$250.68</h5>
                    </div>
                </div>
            </div>
        </div>,
        <div className="top_product">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="product_img">
                                <img src="images/index/pd_right1.jpg" className="img-fluid w-100"
                                    alt="pd_right1" />
                            </div>
                        </div>
                        <div className="col-lg-6 align-self-center">
                            <div className="product_text">
                                <a href="/">Kitchen Cooker7</a>
                                <div className="review">
                                    <a href="/"><i className="fas fa-star"></i></a>
                                    <a href="/"><i className="fas fa-star"></i></a>
                                    <a href="/"><i className="fas fa-star"></i></a>
                                    <a href="/"><i className="far fa-star"></i></a>
                                    <a href="/"><i className="far fa-star"></i></a>
                                </div>
                                <h5>$250.68</h5>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="product_img">
                                <img src="images/index/pd_right1.jpg" className="img-fluid w-100"
                                    alt="pd_right1" />
                            </div>
                        </div>
                        <div className="col-lg-6 align-self-center">
                            <div className="product_text">
                                <a href="/">Kitchen Cooker8</a>
                                <div className="review">
                                    <a href="/"><i className="fas fa-star"></i></a>
                                    <a href="/"><i className="fas fa-star"></i></a>
                                    <a href="/"><i className="fas fa-star"></i></a>
                                    <a href="/"><i className="far fa-star"></i></a>
                                    <a href="/"><i className="far fa-star"></i></a>
                                </div>
                                <h5>$250.68</h5>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="product_img">
                                <img src="images/index/pd_right1.jpg" className="img-fluid w-100"
                                    alt="pd_right1" />
                            </div>
                        </div>
                        <div className="col-lg-6 align-self-center">
                            <div className="product_text">
                                <a href="/">Kitchen Cooker9</a>
                                <div className="review">
                                    <a href="/"><i className="fas fa-star"></i></a>
                                    <a href="/"><i className="fas fa-star"></i></a>
                                    <a href="/"><i className="fas fa-star"></i></a>
                                    <a href="/"><i className="far fa-star"></i></a>
                                    <a href="/"><i className="far fa-star"></i></a>
                                </div>
                                <h5>$250.68</h5>
                            </div>
                        </div>
                    </div>
                </div>,

          ],
          []
        );
      
        useEffect(() => {
          const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % divs.length);
          }, slideDuration);
      
          return () => {
            clearInterval(interval);
          };
        }, [divs, slideDuration]);
      
        const goToNextSlide = () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % divs.length);
        };
      
        const goToPreviousSlide = () => {
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? divs.length - 1 : prevIndex - 1
          );
        };
    const [selectedPrice, setSelectedPrice] = useState(null);

    const handleButtonClick = (price) => {
        setSelectedPrice(price);
    };
    // slider start
    const images = [

        '/images/slide-4.png',
        '/images/slide-5.png',
        '/images/slide-6.png',

    ];
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const previousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };
    //   slider end

    // zoom
    useEffect(() => {
        $(document).ready(function () {
            var jony = document.querySelectorAll("#NZoomImg");
            var arr = Array.from(jony);
            arr.map((item, index) => {
                console.log(item.parentElement.classList[1]);
                let t = item,
                    e = t.getAttribute("data-NZoomscale") <= 0 ? 1 : t.getAttribute("data-NZoomscale");
                    // s = t.clientWidth,
                    // o = t.clientHeight;
                item.parentElement.classList.add(`NZoomContainer${index}`);
                let i = $(`.NZoomContainer${index}`);
                    // n = item;
                i.mouseenter(function () {
                    item.style.cursor = "crosshair";
                    item.style.transition = "0.2s";
                    item.style.transform = `scale(${e})`;
                });
                i.mousemove(function (t) {
                    let e = $(this).offset(),
                        x = (t.pageX - e.left) / 380 * 100 <= 100 ? (t.pageX - e.left) / 380 * 100 : 100,
                        c = (t.pageY - e.top) / 380 * 100 <= 100 ? (t.pageY - e.top) / 380 * 100 : 100;
                    item.style.transformOrigin = `${x}% ${c}%`;
                });
                i.mouseleave(function () {
                    item.style.transition = "0.2s";
                    item.style.transform = "scale(1)";
                });
            });
        });
        // 
    }, []);
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          }
        ]
      };
    return (
        <>
 <Layout title={'Home'}>



            <div className='slider_main_div'>
                <button onClick={previousImage} className='btn'>&#60;</button>
                <a href="/">      <img src={images[currentImageIndex]} alt="Slider"
                    style={{ width: '100%', }}

                /></a>

                {/* <img src="images/slider-1.png" alt="s" /> */}
                {/* <img src="images/slide-1.jpg" alt=""/> */}

                <button onClick={nextImage} className='btn nxt'>&#62;</button>
            </div>
            {/* <!-- ========== Banner Part End ========== -->

<!-- ========== Service Part Start ========== --> */}
  <section id="service">
      <Slider {...sliderSettings}>
        <div className="slider-item">
          <div className="col-lg-3 slider-item-col">
            <div className="service_item d-flex">
              <div className="service_icon align-self-center ">
                <i className="fas fa-truck"></i>
              </div>
              <div className="service_text">
                <h5>Free Shipping & Returns</h5>
                <p>For all orders over $99</p>
              </div>
            </div>
          </div>
        </div>
        <div className="slider-item">
          <div className="col-lg-3 slider-item-col">
            <div className="service_item d-flex">
              <div className="service_icon align-self-center">
                <i className="fas fa-briefcase"></i>
              </div>
              <div className="service_text">
                <h5>Secure Payment</h5>
                <p>We ensure secure payment</p>
              </div>
            </div>
          </div>
        </div>
        <div className="slider-item">
          <div className="col-lg-3 slider-item-col">
            <div className="service_item d-flex">
              <div className="service_icon align-self-center">
                <i className="fas fa-hand-holding-usd"></i>
              </div>
              <div className="service_text">
                <h5>Money Back Guarantee</h5>
                <p>Any back within 30 days</p>
              </div>
            </div>
          </div>
        </div>
        <div className="slider-item">
          <div className="col-lg-3 slider-item-col">
            <div className="service_item d-flex">
              <div className="service_icon align-self-center">
                <i className="far fa-comment-dots"></i>
              </div>
              <div className="service_text">
                <h5>Customer Support</h5>
                <p>Call or email us 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </section>
            {/* <!-- ========== Service Part End ========== -->

<!-- ========== Category Banner Part Start ========== --> */}
            <section id="category_banner">
                <div className="container px-lg-0">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="category_banner_img category_banner_img_one">
                                <img className="img-fluid w-100" src="images/index/Category_Banner_img1.jpg"
                                    alt="Category_Banner_img1" />
                                <div className="ovrly">
                                    <h4>Get up to <span>20% Off</span> </h4>
                                    <h2>Sports Outfits</h2>
                                    <h3>Collection</h3>
                                    <p>Starting at <span>$170.00</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="category_banner_img category_banner_img_two">
                                <img className="img-fluid w-100" src="images/index/Category_Banner_img2.jpg"
                                    alt="Category_Banner_img2" />
                                <div className="ovrly">
                                    <h4>New Arrivals</h4>
                                    <h2>Accessories</h2>
                                    <h3>Collection</h3>
                                    <p>Only From <span>$90.00</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ========== Category Banner Part End ========== -->

<!-- ========== Product detail Part Start ========== --> */}
            <section id="product_detail">
                <div className="container px-lg-0">
                    <div className="row d-flex">
                        {/* <!-- Product left start --> */}
                        <div className="col-lg-9">
                            <div className="zoom_part">
                                <div className="col-lg-12">
                                    <div className="zoom_head">
                                        <h2>Deals Hot Of The Day</h2>
                                    </div>
                                </div>
                                <div className="row zoom_row">
                                    <div className="col-lg-6">
                                        <div id="carouselExampleIndicators" className="carousel carousel-fade zoom_img_part"
                                            data-bs-ride="carousel">
                                            <div className="row">
                                                <div className="col-lg-3">
                                                    <div className="carousel-indicators small_img">
                                                        <button type="button" data-bs-target="#carouselExampleIndicators"
                                                            data-bs-slide-to="0" className="active" aria-current="true"
                                                            aria-label="Slide 1">
                                                            <img src="images/index/pd1.jpg" className="img-fluid w-100" alt="product" />
                                                        </button>
                                                        <button type="button" data-bs-target="#carouselExampleIndicators"
                                                            data-bs-slide-to="1" aria-label="Slide 2">
                                                            <img src="images/index/pd2.jpg" className="img-fluid w-100" alt="product" />
                                                        </button>
                                                        <button type="button" data-bs-target="#carouselExampleIndicators"
                                                            data-bs-slide-to="2" aria-label="Slide 3">
                                                            <img src="images/index/pd3.jpg" className="img-fluid w-100" alt="product" />
                                                        </button>
                                                        <button type="button" data-bs-target="#carouselExampleIndicators"
                                                            data-bs-slide-to="3" aria-label="Slide 3">
                                                            <img src="images/index/pd4.jpg" className="img-fluid w-100" alt="product" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9">
                                                    <div className="carousel-inner zoom_body">
                                                        <div className="carousel-item active">
                                                            <img id="NZoomImg" data-NZoomscale="2" style={{ width: "100%", height: "100%" }} src="images/index/pd1.jpg" alt="product" />

                                                        </div>
                                                        <div className="carousel-item">
                                                            <img id="NZoomImg" data-NZoomscale="2"
                                                                style={{ width: "100%", height: "100%" }} src="images/index/pd2.jpg"
                                                                alt="product" />
                                                        </div>
                                                        <div className="carousel-item">
                                                            <img id="NZoomImg" data-NZoomscale="2"
                                                                style={{ width: "100%", height: "100%" }} src="images/index/pd3.jpg"
                                                                alt="product" />
                                                        </div>
                                                        <div className="carousel-item">
                                                            <img id="NZoomImg" data-NZoomscale="2"
                                                                style={{ width: "100%", height: "100%" }} src="images/index/pd4.jpg"
                                                                alt="product" />
                                                        </div>
                                                    </div>
                                                    <button className="carousel-control-prev" type="button"
                                                        data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                                        <i className="fas fa-chevron-left" aria-hidden="true"></i>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button"
                                                        data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                                        <i className="fas fa-chevron-right" aria-hidden="true"></i>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="zoom_right">
                                            <div className="zoom_text_head">
                                                <a href="/">Beyond OTP Shirt</a>
                                            </div>
                                            <div className="zoom_text">
                                     
                                         
                                                <div className="review">
                                                    <a href="/"><i className="fas fa-star"></i></a>
                                                    <a href="/"><i className="fas fa-star"></i></a>
                                                    <a href="/"><i className="fas fa-star"></i></a>
                                                    <a href="/"><i className="fas fa-star"></i></a>
                                                    <a href="/"><i className="far fa-star"></i></a>
                                                    <a href="/">(3 Review)</a>
                                                </div>
                                            </div>
                                            <div className="product_size">
                                                <div className='d-flex'>
                                                <h4 className='mt-1'>size:</h4>
                                                <div className='ms-2 '>
                                                <button onClick={() => handleClick(10)} className='price-main-btn'>Small</button>
                                                <button onClick={() => handleClick(20)} className='price-main-btn'>Medium</button>
                                                <button onClick={() => handleClick(30)} className='price-main-btn'>Large</button>
                                                <button onClick={() => handleClick(40)} className='price-main-btn'>Extra Large</button>
                                                <h2 className='mt-3'>Price: {price ? `$${price}` : "N/A"}</h2>

    </div>
                                           

                                                    </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Product left end --> */}
                        <div className='Hotdeals'>
                            <h3 className='fw-bolder pt-4 ms-1'>Hot Deals</h3>
      <SlideShow
        divs={divs}
        slideDuration={slideDuration}
        currentIndex={currentIndex}
      />
      <div className="top-main-btn position-absolute top-0">
      <button class="fw-bolder fs-2 btn-top" onClick={goToPreviousSlide}>&#60;</button>
      <button class="fw-bolder fs-2 btn-top ms-1" onClick={goToNextSlide}>&#62;</button>
      </div>
    </div>
{/* ========================== */}
                    </div>
                </div>
            </section>
            {/* <!-- ========== Product detail Part End ========== -->

<!-- ========== Categories Part Start ========== --> */}
            <section id="categories">
                <div className="container px-lg-0">
                    <div className="col-lg-12">
                        <div className="categoreis_header text-center common_header">
                            <h4>Top Categories Of The Month</h4>
                        </div>
                    </div>
                    <div className="row categories_slider">
                        <div className="col-lg-2">
                            <div className="categories_content">
                                <img className="img-fluid w-100" src="images/index/C-1.jpg" alt="C-1" />
                                <div className="cat_text text-center">
                                    <p>Fasion</p>
                                    <a href="/">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="categories_content">
                                <img className="img-fluid w-100" src="images/index/C-2.jpg" alt="C-2" />
                                <div className="cat_text text-center">
                                    <p>Furniture</p>
                                    <a href="/">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="categories_content">
                                <img className="img-fluid w-100" src="images/index/C-3.jpg" alt="C-3" />
                                <div className="cat_text text-center">
                                    <p>Shoes</p>
                                    <a href="/">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="categories_content">
                                <img className="img-fluid w-100" src="images/index/C-4.jpg" alt="C-5" />
                                <div className="cat_text text-center">
                                    <p>Sports</p>
                                    <a href="/">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="categories_content">
                                <img className="img-fluid w-100" src="images/index/C-5.jpg" alt="C-5" />
                                <div className="cat_text text-center">
                                    <p>Games</p>
                                    <a href="/">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="categories_content">
                                <img className="img-fluid w-100" src="images/index/C-6.jpg" alt="C-6" />
                                <div className="cat_text text-center">
                                    <p>Computers</p>
                                    <a href="/">Shop Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ========== Categories Part End ========== -->

<!-- ========== Departments Part Start ========== --> */}
            <section id="department">
                <div className="container px-lg-0">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="department_header common_header">
                                <h4>Popular Departments</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="department_content">
                                <div className="department_menu">
                                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="pills-arrivals-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-arrivals" type="button" role="tab"
                                                aria-controls="pills-arrivals" aria-selected="true">New arrivals</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-seller-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-seller" type="button" role="tab"
                                                aria-controls="pills-seller" aria-selected="false">Best seller</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-popular-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-popular" type="button" role="tab"
                                                aria-controls="pills-popular" aria-selected="false">most popular</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-featured-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-featured" type="button" role="tab"
                                                aria-controls="pills-featured" aria-selected="false">Featured</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="department_item">
                                    <div className="tab-content" id="pills-tabContent">
                                        {/* <!-- Department Item New Arrivals --> */}
                                        <div className="tab-pane fade show active" id="pills-arrivals" role="tabpanel"
                                            aria-labelledby="pills-arrivals-tab">
                            {/* ......... */}
                            <div className="col-md-9 offset-1 All_Products_main_box All_Products_main_box_short" >
                    {/* <h1 className="text-center">All Products</h1> */}
                    <div className="d-flex flex-wrap ">
                        {products?.map((p) => (
                            <div className="card vvvv m-2 " style={{  width: "300px",height:"340px" }} key={p._id}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    style={{ width: "200px" }}
                                />
                                <div className="card-body">
                                    <h5 className="" style={{margin: "0px",padding:"0px"}}>{p.name}</h5>
                                    <p className="" style={{margin: "0px",padding:"0px"}}>
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="box-price-main" style={{margin: "0px",padding:"0px"}}> $ {p.price}</p>
                                    <div className="hover-main-btn cart-btnadd">
                                    <button
                                        className="moredetails addtocardmoredetails ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                       <i class="fas addicon fa-info-circle"></i>

                                    </button> <br />
                                    <button className="addtocard addtocardmoredetails btn-danger ms-1"
                                        onClick={() => {
                                            setCart([...cart, p])
                                            toast.success('Item Added to Cart')
                                        }}>
                                        <i class="fas addicon fa-shopping-bag"></i>

                                    </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
         
                </div>
                {/* ............... */}
                                        </div>
                                        {/* <!-- Department Item Best Seller --> */}
                                        <div className="tab-pane fade" id="pills-seller" role="tabpanel"
                                            aria-labelledby="pills-seller-tab">
                            {/* ......... */}
                            <div className="col-md-9 offset-1 All_Products_main_box All_Products_main_box_short" >
                    {/* <h1 className="text-center">All Products</h1> */}
                    <div className="d-flex flex-wrap ">
                        {products?.map((p) => (
                            <div className="card vvvv m-2 " style={{  width: "300px",height:"340px" }} key={p._id}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    style={{ width: "200px" }}
                                />
                                <div className="card-body">
                                    <h5 className="" style={{margin: "0px",padding:"0px"}}>{p.name}</h5>
                                    <p className="" style={{margin: "0px",padding:"0px"}}>
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="box-price-main" style={{margin: "0px",padding:"0px"}}> $ {p.price}</p>
                                    <div className="hover-main-btn cart-btnadd">
                                    <button
                                        className="moredetails addtocardmoredetails ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                       <i class="fas addicon fa-info-circle"></i>

                                    </button> <br />
                                    <button className="addtocard addtocardmoredetails btn-danger ms-1"
                                        onClick={() => {
                                            setCart([...cart, p])
                                            toast.success('Item Added to Cart')
                                        }}>
                                        <i class="fas addicon fa-shopping-bag"></i>

                                    </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
         
                </div>
                {/* ............... */}
                                        </div>
                                         {/* <!-- Department Item Best Seller --> */}
                                        <div className="tab-pane fade" id="pills-popular" role="tabpanel"
                                            aria-labelledby="pills-popular-tab">
                            {/* ......... */}
                            <div className="col-md-9 offset-1 All_Products_main_box All_Products_main_box_short" >
                    {/* <h1 className="text-center">All Products</h1> */}
                    <div className="d-flex flex-wrap ">
                        {products?.map((p) => (
                            <div className="card vvvv m-2 " style={{  width: "300px",height:"340px" }} key={p._id}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    style={{ width: "200px" }}
                                />
                                <div className="card-body">
                                    <h5 className="" style={{margin: "0px",padding:"0px"}}>{p.name}</h5>
                                    <p className="" style={{margin: "0px",padding:"0px"}}>
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="box-price-main" style={{margin: "0px",padding:"0px"}}> $ {p.price}</p>
                                    <div className="hover-main-btn cart-btnadd">
                                    <button
                                        className="moredetails addtocardmoredetails ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                       <i class="fas addicon fa-info-circle"></i>

                                    </button> <br />
                                    <button className="addtocard addtocardmoredetails btn-danger ms-1"
                                        onClick={() => {
                                            setCart([...cart, p])
                                            toast.success('Item Added to Cart')
                                        }}>
                                        <i class="fas addicon fa-shopping-bag"></i>

                                    </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
         
                </div>
                {/* ............... */}
                                        </div>
                                         {/* <!-- Department Item Best Seller --> */}
                                        <div className="tab-pane fade" id="pills-featured" role="tabpanel"
                                            aria-labelledby="pills-featured-tab">
                            {/* ......... */}
                            <div className="col-md-9 offset-1 All_Products_main_box All_Products_main_box_short" >
                    {/* <h1 className="text-center">All Products</h1> */}
                    <div className="d-flex flex-wrap ">
                        {products?.map((p) => (
                            <div className="card vvvv m-2 " style={{  width: "300px",height:"340px" }} key={p._id}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    style={{ width: "200px" }}
                                />
                                <div className="card-body">
                                    <h5 className="" style={{margin: "0px",padding:"0px"}}>{p.name}</h5>
                                    <p className="" style={{margin: "0px",padding:"0px"}}>
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="box-price-main" style={{margin: "0px",padding:"0px"}}> $ {p.price}</p>
                                    <div className="hover-main-btn cart-btnadd">
                                    <button
                                        className="moredetails addtocardmoredetails ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                       <i class="fas addicon fa-info-circle"></i>

                                    </button> <br />
                                    <button className="addtocard addtocardmoredetails btn-danger ms-1"
                                        onClick={() => {
                                            setCart([...cart, p])
                                            toast.success('Item Added to Cart')
                                        }}>
                                        <i class="fas addicon fa-shopping-bag"></i>

                                    </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
         
                </div>
                {/* ............... */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ========== Departments Part End ========== -->

<!-- ========== Category Banner Part Start ========== --> */}
            <section id="category_banner"> 
       
                <div className="container px-lg-0">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="category_banner_img category_banner_img_four">
                                <img className="img-fluid w-100" src="images/index/Category_Banner_img4.jpg"
                                    alt="Category_Banner_img4" />
                                <div className="ovrly">
                                    <p>Natural Process</p>
                                    <h6>Cosmetic Makeup Professional</h6>
                                    <a href="/">Shop Now <i className="fas fa-long-arrow-alt-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="category_banner_img category_banner_img_three">
                                <img className="img-fluid w-100" src="images/index/Category_Banner_img3.jpg"
                                    alt="Category_Banner_img3" />
                                <div className="ovrly">
                                    <p>Trending Now</p>
                                    <h6>Women's Lifestyle Collection</h6>
                                    <a href="/">Shop Now <i className="fas fa-long-arrow-alt-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ========== Category Banner Part End ========== -->

<!-- ========== Product Wrapper Part Start ========== --> */}
            <section id="product_wrap">
                <div className="container px-lg-0">
               
                    <div className="product_wrap_part wrap_one">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="wrap_common_head d-flex justify-content-between">
                                    <h6>Clothing & Apparel</h6>
                                    {/* <a href="/">More Products <i className="fas fa-long-arrow-alt-right"></i></a> */}
                                </div>
                            </div>
                        </div>
                        <div className="row wrap_item_row">
                            <div className="col-lg-3">
                                <div className="wrap_banner">
                                <img className="img-fluid w-100" src="images/index/product_banner2.jpg" alt="product_banner1" style={{marginTop: "10px"}} />

                                    <div className="ovrly">
                                        <p>Weekend Sale</p>
                                        <h2>New Arrivals <span>Collection</span></h2>
                                        <a href="/">Shop Now</a>
                                    </div>
                                </div>
                            </div>

                            {/* ......... */}
                            <div className="col-md-9 offset-1 All_Products_main_box" >
                    {/* <h1 className="text-center">All Products</h1> */}
                    <div className="d-flex flex-wrap ">
                        {products?.map((p) => (
                            <div className="card vvvv m-2 " style={{ width: "300px" }} key={p._id}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    style={{ width: "200px" }}
                                />
                                <div className="card-body">
                                    <h5 className="" style={{margin: "0px",padding:"0px"}}>{p.name}</h5>
                                    <p className="" style={{margin: "0px",padding:"0px"}}>
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="box-price-main" style={{margin: "0px",padding:"0px"}}> $ {p.price}</p>
                                    <div className="hover-main-btn cart-btnadd">
                                    <button
                                        className="moredetails addtocardmoredetails ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                       <i class="fas addicon fa-info-circle"></i>

                                    </button> <br />
                                    <button className="addtocard addtocardmoredetails btn-danger ms-1"
                                        onClick={() => {
                                            setCart([...cart, p])
                                            toast.success('Item Added to Cart')
                                        }}>
                                        <i class="fas addicon fa-shopping-bag"></i>

                                    </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="all-btn-style loading-btn btn-warning"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? "Loading ..." : "Loadmore"}
                            </button>
                        )}
                    </div>
                </div>
                {/* ............... */}
                        </div>
                    </div>
             
                    <div className="product_wrap_part wrap_two">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="wrap_common_head d-flex justify-content-between">
                                    <h6>Consumer Electric</h6>
                                    {/* <a href="/">More Products <i className="fas fa-long-arrow-alt-right"></i></a> */}
                                </div>
                            </div>
                        </div>
                        <div className="row wrap_item_row">
                            <div className="col-lg-3">
                                <div className="wrap_banner">
                                    <img className="img-fluid w-100" src="images/index/product_banner2.jpg" alt="product_banner1" style={{marginTop: "10px"}}/>
                                    <div className="ovrly">
                                        <p>New Collection</p>
                                        <h2>Top Camera<span> Mirrorless </span></h2>
                                        <a href="/">Shop Now</a>
                                    </div>
                                </div>
                            </div>

                            {/* ......... */}
                            <div className="col-md-9 offset-1 All_Products_main_box" >
                    {/* <h1 className="text-center">All Products</h1> */}
                    <div className="d-flex flex-wrap ">
                        {products?.map((p) => (
                            <div className="card vvvv m-2 " style={{ width: "300px" }} key={p._id}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    style={{ width: "200px" }}
                                />
                                <div className="card-body">
                                    <h5 className="" style={{margin: "0px",padding:"0px"}}>{p.name}</h5>
                                    <p className="" style={{margin: "0px",padding:"0px"}}>
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="box-price-main" style={{margin: "0px",padding:"0px"}}> $ {p.price}</p>
                                    <div className="hover-main-btn cart-btnadd">
                                    <button
                                        className="moredetails addtocardmoredetails ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                       <i class="fas addicon fa-info-circle"></i>

                                    </button> <br />
                                    <button className="addtocard addtocardmoredetails btn-danger ms-1"
                                        onClick={() => {
                                            setCart([...cart, p])
                                            toast.success('Item Added to Cart')
                                        }}>
                                        <i class="fas addicon fa-shopping-bag"></i>

                                    </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="all-btn-style loading-btn btn-warning"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? "Loading ..." : "Loadmore"}
                            </button>
                        )}
                    </div>
                </div>
                {/* ............... */}
                        </div>
                    </div>
             
                    <div className="product_wrap_banner" style={{ background: "url(images/index/product_wrap_banner.jpg)" }}>
                        <div className="row">
                            <div className="col-lg-2">
                                <div className="wrap_banner_content text-start">
                                    <h2>25<b>%</b><span>Off</span></h2>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="wrap_banner_content text-start">
                                    <h4>For Today's Fashion</h4>
                                    <p>Use code <span>Black<b>12345</b></span> to get best offer.</p>
                                </div>
                            </div>
                            <div className="col-lg-3 align-self-center">
                                <div className="wrap_banner_content text-end">
                                    <a href="/">Shop Now <i className="fas fa-long-arrow-alt-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                {/* ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, */}
                    <div className="product_wrap_part wrap_three">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="wrap_common_head d-flex justify-content-between">
                                    <h6>Home Garden & Kitchen</h6>
                                    {/* <a href="/">More Products <i className="fas fa-long-arrow-alt-right"></i></a> */}
                                </div>
                            </div>
                        </div>
                        <div className="row wrap_item_row">
                            <div className="col-lg-3">
                                <div className="wrap_banner">
                                    <img className="img-fluid w-100" src="images/index/product_banner3.jpg" alt="product_banner3" style={{marginTop: "10px"}} />
                                    <div className="ovrly">
                                        <p>Weekend Sale</p>
                                        <h2>New Arrivals <span>Collection</span></h2>
                                        <a href="/">Shop Now</a>
                                    </div>
                                </div>
                            </div>

                            {/* ......... */}
                            <div className="col-md-9 offset-1 All_Products_main_box" >
                    {/* <h1 className="text-center">All Products</h1> */}
                    <div className="d-flex flex-wrap ">
                        {products?.map((p) => (
                            <div className="card vvvv m-2 " style={{ width: "300px" }} key={p._id}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    style={{ width: "200px" }}
                                />
                                <div className="card-body">
                                    <h5 className="" style={{margin: "0px",padding:"0px"}}>{p.name}</h5>
                                    <p className="" style={{margin: "0px",padding:"0px"}}>
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="box-price-main" style={{margin: "0px",padding:"0px"}}> $ {p.price}</p>
                                 {/* <div className="hover-main-btn">
                                    <button
                                        className="all-btn-style ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                        More Details
                                    </button>
                                    <button className="all-btn-style btn-danger ms-1"
                                        onClick={() => {
                                            setCart([...cart, p])
                                            toast.success('Item Added to Cart')
                                        }}>
                                        ADD TO CART
                                    </button>
                                    </div> */}
                                                                        <div className="hover-main-btn cart-btnadd">
                                    <button
                                        className="moredetails addtocardmoredetails ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                       <i class="fas addicon fa-info-circle"></i>

                                    </button> <br />
                                    <button className="addtocard addtocardmoredetails btn-danger ms-1"
                                        onClick={() => {
                                            setCart([...cart, p])
                                            toast.success('Item Added to Cart')
                                        }}>
                                        <i class="fas addicon fa-shopping-bag"></i>

                                    </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="">
                        {products && products.length < total && (
                            <button
                                className="all-btn-style loading-btn btn-warning"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? "Loading ..." : "Loadmore"}
                            </button>
                        )}
                    </div>
                </div>
                {/* ............... */}
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ========== Product Wrapper Part End ========== -->

<!-- ========== Client Part Start ========== --> */}
            <section id="client">
                <div className="container px-lg-0">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="client_head">
                                <h6>Our Clients</h6>
                            </div>
                        </div>
                    </div>
                    <div className="client_logo">
                        <ul className="d-flex client_slider">
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client1.png" alt="client1" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client2.png" alt="client2.png" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client3.png" alt="client3" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client4.png" alt="client4" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client5.png" alt="client5" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client6.png" alt="client6" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client7.png" alt="client7" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client8.png" alt="client8" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client9.png" alt="client9" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client10.png" alt="client10" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client11.png" alt="client11" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client2.png" alt="client12" />
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* <!-- ========== Client Part End ========== -->

<!-- ========== Blog Part Start ========== --> */}
            <section id="our_blog">
                <div className="container px-lg-0">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="common_header blog_header">
                                <h6>From Our Blog</h6>
                                <a href="/">View All Articles</a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="our_blog_content text-center">
                                <div className="our_blog_img">
                                    <img className="img-fluid w-100" src="images/index/ourblog1.jpg" alt="ourblog1" />
                                </div>
                                <div className="our_blog_text">
                                    <span>by<a href="/">John Doe</a>-<a href="/">03.05.2021</a></span>
                                    <a className="blog_name" href="/">Aliquam tincidunt mauris eurisus</a>
                                    <a className="blog_rm" href="/">Read More <i className="fas fa-long-arrow-alt-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="our_blog_content text-center">
                                <div className="our_blog_img">
                                    <img className="img-fluid w-100" src="images/index/ourblog2.jpg" alt="ourblog2" />
                                </div>
                                <div className="our_blog_text">
                                    <span>by<a href="/">John Doe</a>-<a href="/">03.05.2021</a></span>
                                    <a className="blog_name" href="/">Cras ornare tristique elit</a>
                                    <a className="blog_rm" href="/">Read More <i className="fas fa-long-arrow-alt-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="our_blog_content text-center">
                                <div className="our_blog_img">
                                    <img className="img-fluid w-100" src="images/index/ourblog3.jpg" alt="ourblog3" />
                                </div>
                                <div className="our_blog_text">
                                    <span>by<a href="/">John Doe</a>-<a href="/">03.05.2021</a></span>
                                    <a className="blog_name" href="/">Vivamus vestibulum ntulla nec ante</a>
                                    <a className="blog_rm" href="/">Read More <i className="fas fa-long-arrow-alt-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="our_blog_content text-center">
                                <div className="our_blog_img">
                                    <img className="img-fluid w-100" src="images/index/ourblog4.jpg" alt="ourblog4" />
                                </div>
                                <div className="our_blog_text">
                                    <span>by<a href="/">John Doe</a>-<a href="/">03.05.2021</a></span>
                                    <a className="blog_name" href="/">Fusce lacinia arcuet nulla</a>
                                    <a className="blog_rm" href="/">Read More <i className="fas fa-long-arrow-alt-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ========== Blog Part End ========== -->

<!-- ========== Views Part Start ========== --> */}
            <section id="views">
                <div className="container px-lg-0">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="common_header blog_header">
                                <h6>Your Recent Views</h6>
                            </div>
                        </div>
                    </div>
                    <div className="row views_slider">
                        <div className="col">
                            <div className="view_item">
                                <img className="img-fluid w-100" src="images/index/views1.jpg" alt="views1" />
                                <div className="ovrly">
                                    <a href="/">Women's Fashion Handbag</a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="view_item">
                                <img className="img-fluid w-100" src="images/index/views2.jpg" alt="views2" />
                                <div className="ovrly">
                                    <a href="/">Electric Frying Pen</a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="view_item">
                                <img className="img-fluid w-100" src="images/index/views3.jpg" alt="views3" />
                                <div className="ovrly">
                                    <a href="/">Black Winter Skating</a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="view_item">
                                <img className="img-fluid w-100" src="images/index/views4.jpg" alt="views4" />
                                <div className="ovrly">
                                    <a href="/">HD TV</a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="view_item">
                                <img className="img-fluid w-100" src="images/index/views5.jpg" alt="views5" />
                                <div className="ovrly">
                                    <a href="/">Home Sofa</a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="view_item">
                                <img className="img-fluid w-100" src="images/index/views6.jpg" alt="views6" />
                                <div className="ovrly">
                                    <a href="/">Headphones</a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="view_item">
                                <img className="img-fluid w-100" src="images/index/views7.jpg" alt="views7" />
                                <div className="ovrly">
                                    <a href="/">Electric Rice-Cooker</a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="view_item">
                                <img className="img-fluid w-100" src="images/index/views8.jpg" alt="views8" />
                                <div className="ovrly">
                                    <a href="/">Table Lamp</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </Layout>
        </>
    );
}

export default Home;



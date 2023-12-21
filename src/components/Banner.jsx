import pic from "../assets/Free Macbook Pro and iPhone Mockup.png"

const Banner = () => {
    return (
        <div className="min-h-screen flex items-center justify-between">
            <div className="max-w-lg">
                <h1 className="text-5xl font-bold">Box Office News!</h1>
                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                <button className="btn btn-primary bg-tmred border-0 text-tmwhite">Get Started</button>
            </div>
            <div>
                <img src={pic} alt="" />
            </div>

        </div>

    );
};

export default Banner;
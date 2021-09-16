import './footer.css'

const Footer = () => {
    return (
        <section id="footer">
            <div class="row">
                <div class="card col-lg-3 col-md-6 col-sm-12">
                    <h3 class="footer-head">About Site</h3>
                    <div class="footer-desc">
                        <p>We’re reimagining how you rent. It’s now easier to get into a place you love. So let’s do
                            this,together.</p>
                    </div>
                </div>
                <div class="card col-lg-3 col-md-6 col-sm-12">
                    <h3 class="footer-head">Contact Us</h3>
                    <div class="footer-desc">
                        <p><a href="mailto:nusratjahantisha763@gmail.com">nusratjahantisha777@gmail.com</a></p>
                        <p><a href="rubaiat15-8993@diu.edu.bd">rubaiat15-8993@diu.edu.bd</a></p>
                        <p><a href="tel:+8801521201882">+8801521201882</a></p>
                    </div>
                </div>
                <div class="card col-lg-3 col-md-6 col-sm-12">
                    <h3 class="footer-head">Quick Links</h3>
                    <div class="footer-desc quick-link">
                        <p><a href="#">About Us</a></p>
                        <p><a href="#">User Guide</a></p>
                        <p><a href="#">Support Center</a></p>
                        <p><a href="#">Terms and Condition</a></p>
                    </div>
                </div>
                <div class="card col-lg-3 col-md-6 col-sm-12">
                    <h3 class="footer-head">Follow Us</h3>
                    <div class="">
                        <a href="#" class="fa fa-facebook social-icon"></a>
                        <a href="#" class="fa fa-twitter social-icon"></a>
                        <a href="#" class="fa fa-google social-icon"></a>
                        <a href="#" class="fa fa-linkedin social-icon"></a>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Footer;
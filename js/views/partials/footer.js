import FooterTemplate from '../../../templates/partials/footer';

class Footer {
    render() {
        return new Promise(resolve => resolve(FooterTemplate()));
    }
}

export default Footer;
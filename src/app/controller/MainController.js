import WelcomeScreen from '/app/component/welcomeScreen/WelcomeScreen';
import ViewNavigation from '/app/component/viewNavigation/ViewNavigation';
import ContentModel from '/app/model/ContentModel';

export default class MainController {
    constructor(introTarget) {
        
        let navData = Object.assign(ContentModel.componentData.viewNavigation, {items: ContentModel.viewData});
        console.log("ADA", navData);
        this.viewNavigation = new ViewNavigation(navData);
        
        this.welcomeScreen = new WelcomeScreen(ContentModel.componentData.welcomeScreen);
        this.welcomeScreen.appendTo(introTarget);
        this.welcomeScreen.registerNavComponent(this.viewNavigation);
    }
}
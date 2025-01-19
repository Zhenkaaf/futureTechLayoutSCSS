import Header from "./Header.js";
import defineScrollBarWidthCSSVar from "./utils/defineScrollBarWidthCSSVar.js";
import TabsCollection from "./Tabs.js";
import VideoPlayerCollection from "./VideoPlayer.js";
import ExpandableContentCollection from "./ExpandableContent.js";
import InputMaskCollection from "./InputMask.js";
new Header();
new TabsCollection();
new VideoPlayerCollection();
new ExpandableContentCollection();
new InputMaskCollection();

defineScrollBarWidthCSSVar();

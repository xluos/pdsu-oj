// 图标
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faBolt, 
  faSpinner, 
  faUnlink,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { 
  faLightbulb, 
  faFrown,
} from '@fortawesome/free-regular-svg-icons';

library.add(
  faBolt //闪电
  , faExclamationTriangle //警告
  , faUnlink //链接 
  , faFrown // 弯嘴 far
  , faSpinner // loading
  , faLightbulb // idea 灯泡 far
)
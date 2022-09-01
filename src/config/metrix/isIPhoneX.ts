import {Dimensions, Platform} from 'react-native';

type IDimensions = {height: number; width: number};

export function isIPhoneXSize(dim: IDimensions) {
	return dim.height == 812 || dim.width == 812;
}

export function isIPhoneXrSize(dim: IDimensions) {
	return dim.height == 896 || dim.width == 896;
}

export function isIphoneX() {
	const dim = Dimensions.get('window');

	return Platform.OS === 'ios' && (isIPhoneXSize(dim) || isIPhoneXrSize(dim));
}

import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Текущие примененные настройки
	const [appliedSettings, setAppliedSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const handleSettingsChange = (newSettings: ArticleStateType) => {
		console.log('Применяем настройки:', newSettings);
		setAppliedSettings(newSettings);
	};

	// Отслеживаем изменения примененных настроек
	useEffect(() => {
		console.log('Примененные настройки обновлены:', appliedSettings);
		console.log('CSS-переменные:', {
			'--font-family': appliedSettings.fontFamilyOption.value,
			'--font-size': appliedSettings.fontSizeOption.value,
			'--font-color': appliedSettings.fontColor.value,
			'--container-width': appliedSettings.contentWidth.value,
			'--bg-color': appliedSettings.backgroundColor.value,
		});
	}, [appliedSettings]);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedSettings.fontFamilyOption.value,
					'--font-size': appliedSettings.fontSizeOption.value,
					'--font-color': appliedSettings.fontColor.value,
					'--container-width': appliedSettings.contentWidth.value,
					'--bg-color': appliedSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSettingsChange={handleSettingsChange} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

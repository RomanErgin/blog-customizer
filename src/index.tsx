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
	// Настройки в форме (могут отличаться от примененных)
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(defaultArticleState);
	// Состояние сайдбара
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleApplySettings = () => {
		console.log('Применяем настройки:', formSettings);
		setAppliedSettings(formSettings);
		setIsSidebarOpen(false);
	};

	const handleResetSettings = () => {
		console.log('Сбрасываем настройки на дефолтные:', defaultArticleState);
		setFormSettings(defaultArticleState);
		setAppliedSettings(defaultArticleState);
		setIsSidebarOpen(false);
	};

	const handleSidebarToggle = () => {
		setIsSidebarOpen(!isSidebarOpen);
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
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onToggle={handleSidebarToggle}
				formSettings={formSettings}
				onFormSettingsChange={setFormSettings}
				onApply={handleApplySettings}
				onReset={handleResetSettings}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

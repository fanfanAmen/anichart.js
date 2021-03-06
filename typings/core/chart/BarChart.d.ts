import { Component } from "../component/Component";
import { Stage } from "../Stage";
import { BaseChart, BaseChartOptions, KeyGener } from "./BaseChart";
interface BarChartOptions extends BaseChartOptions {
    itemCount?: number;
    barPadding?: number;
    barGap?: number;
    barInfoFormat?: KeyGener;
    dateLabelSize?: number;
    showDateLabel?: boolean;
}
export declare class BarChart extends BaseChart {
    constructor(options?: BarChartOptions);
    itemCount: number;
    barPadding: number;
    barGap: number;
    swap: number;
    lastValue: Map<string, number>;
    labelPlaceholder: number;
    valuePlaceholder: number;
    dateLabelSize: number;
    showDateLabel: boolean;
    get sampling(): number;
    barInfoFormat: (id: any, data?: Map<string, any>, meta?: Map<string, any>) => string;
    historyIndex: Map<any, any>;
    ids: string[];
    setup(stage: Stage): void;
    private setHistoryIndex;
    private get maxValueLabelWidth();
    private get maxLabelWidth();
    getComponent(sec: number): Component;
    private get barHeight();
    private getBarOptions;
    private getBarComponent;
    private getLabelTextOptions;
}
export {};

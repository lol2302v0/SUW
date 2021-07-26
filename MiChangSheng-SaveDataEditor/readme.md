# SPC-Util : Map-Designer 可视化地图设计工具

Map-Designer(下称 SUMD) 是 SPC-Util 工具集中的一员，用于 PvZ2 世界地图 的设计。

SUMD 相比同类工具，具有以下特点：

* 美观：SUMD使用 Material-Design 风格的UI，视觉效果优良。

* 支持动画元件：提取自官方数据包中的PAM动画（worldName/animN）。

	> 动画元件的运作会大大降低程序运行的流畅度，出于性能考虑，程序默认使用动画的第一帧，可在 Config.json 配置中修改。

## UI 界面

* 左抽屉：显示元件信息编辑界面

* 右抽屉：显示元件商店，可从此处拖拽项目在地图中构造新元件。
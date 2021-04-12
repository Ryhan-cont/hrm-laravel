<template>
	<div align="left">
		<!-- <div @click="logData()" class="fa-20">logdata</div> -->
		<!-- //Custom Table Start--------------------------------- -->
		<div v-if="restartTable" ref="urlTableContainer" class="border-6 pos-rel">
			<!-- //Custom Table Header Start---------------------- -->
			<div class="flx" @mousemove="objDrag">
				<div :style="'width:'+(tableData.leftBarWidth)"></div>
				<div style="overflow: hidden; height:40px; background-color:#F2F2F2" class="flx-1 pos-rel">
					<div ref="urlTablehead" class="pos-abs flx" style="white-space:nowrap; height40px;">
						<div v-for="(item, index) in columnDefs" :key="index" v-if="(item.type != 'pinned')">
							<div v-if="item.type == 'gen'" :style="item.cellStyle" class="fy-10 fr-3 fl-6 f-12 f-bold flx">
								<div :class="'flx-1 line-txt '+item.cellClass">{{item.title}}</div>
								<div class="fas fa-bars f-10 ft-4 fx-3 pointer url-custom-table-filter-btn" :style="(item.filterActive == true)?'color:#00b554':'color:#a8a8a8'" @click="menuLoad($event,index)"></div>
								<div @mousedown="eventStat(index, 'down')" class="f-8 ft-3" style="color:#d4d4d4; cursor:ew-resize">|</div>
							</div>
							<div v-if="item.type == 'permArr'" :style="item.cellStyle" class="fy-10 fr-3 fl-6 f-12 f-bold flx">
								<div :class="'flx-1 line-txt '+item.cellClass">{{item.title}}</div>
								<div class="fas fa-bars f-10 ft-4 fx-3 pointer url-custom-table-filter-btn" :style="(item.filterActive == true)?'color:#00b554':'color:#a8a8a8'" @click="menuLoad($event,index)"></div>
								<div @mousedown="eventStat(index, 'down')" class="f-8 ft-3" style="color:#d4d4d4; cursor:ew-resize">|</div>
							</div>
						</div>
					</div>
				</div>
				<div :style="'width:'+(tableData.rightBarWidth)+'; height:40px; background-color:#F2F2F2; border-left:1px solid #d1d1d1'" class="txt-center line-txt f-12 f-bold fy-10">Action</div>
				<div v-if="tableData.showYScroll" style="width:17px;background-color:#F2F2F2"></div>
			</div>
			<!-- //Custom Table Header End---------------------- -->

			<!-- //Custom Table Body Start---------------------- -->
			<div :style="tableData.yScrollCss+' overflow-x: hidden; min-height:40px'">
				<div class="flx" >
					<div :style="'width:'+(tableData.leftBarWidth)+'; border-right:0px solid #d1d1d1; color:#757575;max-height:auto'"></div>
					<div ref="urlTableBody" style="overflow: hidden;" class="flx-1 pos-rel">
						<div ref="urlTableBodyAbs" class="pos-abs">
							<div v-for="(itemData, dataIndex) in value" :key="dataIndex" v-if="itemData.filteredView" class="flx border-3" :style="{height:tableData.cellHeight}">
								<div v-for="(item, index) in columnDefs" v-if="(item.type != 'pinned')" :key="index" >
									<div v-if="item.type == 'gen'" :class="'fy-10 fr-3 fl-6 f-14 line-txt '+item.cellClass" :style="item.cellStyle">{{itemData[item.field]}}</div>
									<div v-if="item.type == 'permArr'" :class="'fy-10 fr-3 fl-6 f-14 line-txt '+item.cellClass" :style="item.cellStyle">
										{{permArr(itemData[item.field])}}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div :style="'width:'+(tableData.rightBarWidth)+'; border-left:1px solid #d1d1d1; color:#757575;max-height:auto'">
						<div v-for="(itemData, dataIndex) in value" :key="dataIndex" v-if="itemData.filteredView" class="flx fy-12 fx-4 border-3" :style="{height:tableData.cellHeight}">
							<div class="f-14 pointer gx-5" @click="moduleAction(itemData,'edit')"><i class="material-icons f-16 icon align">edit</i></div>
							<div class="f-14 pointer gx-5" @click="moduleAction(itemData,'delete')"><i class="material-icons f-16 icon align">delete</i></div>
						</div>
					</div>
				</div>
			</div>
			<!-- //Custom Table Body End------------------------ -->

			<!-- //Custom Table Scroll Start-------------------- -->
			<div class="flx" >
				<div :style="(tableData.showXScroll && tableData.leftBarWidthInt>0)?'width:'+(tableData.leftBarWidthInt+16)+'px;overflow-x:scroll':'width:0px;overflow-x:hidden'"></div>
				<div ref="urlTableScroll" class="flx-1" :style="(tableData.showXScroll)?'overflow-x:scroll;':'overflow-x:hidden'">
					<div :style="{width: tableData.scrollableTableWidth+'px', fontSize:'1px'}">&nbsp;</div>
				</div>
				<div :style="(tableData.showXScroll && tableData.rightBarWidthInt>0)?(tableData.showYScroll)?'width:'+(tableData.rightBarWidthInt+16)+'px;overflow-x:scroll':'width:'+(tableData.rightBarWidthInt)+'px;overflow-x:scroll':'width:0px;overflow-x:hidden'"></div>
			</div>
			<!-- //Custom Table Scroll End--------------------- -->

			<!-- //Custom Table Menu--------------------------- -->
			<div class="pos-abs border-4 shed-sm-3 url-custom-table-filter-box" :style="{top:menuPositionY+'px', left:menuPositionX+'px', width:menuSettings.width+'px',  backgroundColor:'#f5f5f5', zIndex:1}" v-if="menuShow">
				<div class="fy-6">
					<div class="f-12 f-bold fx-8 fb-6">FIlter Menu</div>
					<div style="background-color:#bababa; height:1px; width:100%"></div>
					<div class="fx-8 fy-10">
						<div class="fy-5">
							<select v-model="menuSelected" style="background-color:#fff;outline-color:#bdbdbd" class="border-7 fa-2 f-12 w100">
								<option v-for="(item,index) in menuFilterOptions" :value="item" :key="index">{{ item }}</option>
							</select>
						</div>
						<div class="fy-5"><input v-model="menuFilterData" type="text" @input="menuFilterTrigger()" style="background-color:#fff;outline-color:#bdbdbd" class="border-7 fa-2 f-12 w100"></div>
					</div>
				</div>
			</div>
			<!-- //Custom Table Menu End----------------------- -->
		</div>
		<!-- //Custom Table End-------------------------------- -->
	</div>
</template>
<script>
import {customTable} from "../../script/customTable.js";
export default {
	props: ["value", "tableBase"],
	
    data() {
    	return{
			mouseEvent:{
				mouseDown:false,
				index:null,
				stamp:0,
				position:0,
				oldWidth:0,
			},
			menuSettings:{
				width:120,
				height:130,
				topGap:25,
			},
			dataLoaded:false,
			menuShow:false,
			menuSelected:'Contain',
			menuFilterOptions:[],
			menuFilterIndex:null,
			menuFilterData:null,

			restartTable:true,
			tableResizrObserve:null,
			menuPositionX:0,
			menuPositionY:0,	
    	}
	},
	created() {
		this.columnDefs = customTable.loadCustomTAble(this.value, this.tableBase);
		this.tableData = customTable.loadTableData(this.value, this.columnDefs,this.tableBase);
		window.addEventListener('mouseup', this.eventStat);
		window.addEventListener('click', this.clickEventStat);
	},
	destroyed() {
		window.removeEventListener('mouseup', this.eventStat);
		window.removeEventListener('click', this.clickEventStat);
	},
    mounted(){
		console.log(this.value)
		for(var i=0; this.value.length>i; i++){
			this.value[i].filteredView = true;
		}
		this.$refs.urlTableScroll.addEventListener('scroll', this.tableScroll);
		this.tableResizrObserve = new ResizeObserver(this.resizeTable).observe(this.$refs.urlTableContainer)
		this.resizeTable();
    },
    methods:{
		logData(){
			console.log(this.columnDefs)
		},
		objDrag(event){
			this.mouseEvent.position = event.clientX
			if(this.mouseEvent.mouseDown == true){
				var xData = event.clientX - this.mouseEvent.stamp
				this.tableBase.columnDefs[this.mouseEvent.index].width=this.mouseEvent.oldWidth+xData;
				this.tableBase.columnDefs[this.mouseEvent.index].cellWidth=this.mouseEvent.oldWidth+xData;
				var newCss =customTable.customTableStyle(this.tableBase.columnDefs[this.mouseEvent.index]);
				this.columnDefs[this.mouseEvent.index].cellStyle=newCss;
				this.resizeTable()

			}
		},
		eventStat(index, stst){
			if(stst == 'down'){
				this.mouseEvent.mouseDown = true;
				this.mouseEvent.index = index;
				this.mouseEvent.stamp = this.mouseEvent.position;
				this.mouseEvent.oldWidth = this.columnDefs[index].cellWidth;;
			}else{this.mouseEvent.mouseDown = false;}
		}, 
		clickEventStat(event){
			if(!event.target.closest('.url-custom-table-filter-box, .url-custom-table-filter-btn')){
				this.menuShow = false;
				this.menuFilterData=null;
			}
		},
		tableScroll(e){
			this.$refs['urlTablehead'].style.left=(-1*e.srcElement.scrollLeft)+'px';
			this.$refs['urlTableBodyAbs'].style.left=(-1*e.srcElement.scrollLeft)+'px';
		},
		resizeTable(){
			this.restartTable=false;
			try{
				this.columnDefs = customTable.loadCustomTAble(this.value, this.tableBase,(this.$refs.urlTableBody.clientWidth));
				this.tableData = customTable.loadTableData(this.value, this.columnDefs,this.tableBase,(this.$refs.urlTableBody.clientWidth));
			}catch(err){
				console.log(err)
			}
			this.restartTable=true;
		},
		menuLoad(event,index){
			var tablePositionX = event.clientX-this.$refs.urlTableContainer.getBoundingClientRect().left;
			var tablePositionY = event.clientY-this.$refs.urlTableContainer.getBoundingClientRect().top;
			if((tablePositionX-this.menuSettings.width)<0){
				this.menuPositionX=0;
			}else{
				this.menuPositionX=tablePositionX-this.menuSettings.width;
			}
			this.menuPositionY=this.menuSettings.topGap;

			var type = this.tableBase.columnDefs[index].filterType;

			if(type == 'text'){
				this.menuFilterOptions = ['Contains', 'Not Contains', 'Equal', 'Not Equal', 'Starts With', 'Ends With', ]
				var menuSelected = 'Contains';
			}else if(type == 'number'){
				this.menuFilterOptions = ['Contains', 'Equal','Greaterthen','Lessthen'];
				var menuSelected = 'Contains';
			}else if(type == 'date'){
				this.menuFilterOptions = ['Equal','Greaterthen','Lessthen', 'Inrange'];
				var menuSelected = 'Equal';
			}
			if(this.tableBase.columnDefs[index].filterOption){
				this.menuSelected = this.tableBase.columnDefs[index].filterOption
			}else{
				this.menuSelected = menuSelected;
			}

			this.menuFilterIndex = index;
			this.menuFilterData = this.tableBase.columnDefs[index].filterData;
			

			if(this.menuShow == true){this.menuShow=false;}else{this.menuShow=true;}

		},
		menuFilterTrigger(){
			this.tableBase.columnDefs[this.menuFilterIndex].filterOption=this.menuSelected;
			this.tableBase.columnDefs[this.menuFilterIndex].filterData=this.menuFilterData;
			if(this.menuFilterData == '' || this.menuFilterData == null){
				this.tableBase.columnDefs[this.menuFilterIndex].filterActive = false;
				this.columnDefs[this.menuFilterIndex].filterActive = false;
			}else{
				this.tableBase.columnDefs[this.menuFilterIndex].filterActive = true;
				this.columnDefs[this.menuFilterIndex].filterActive = true;
			}

			//console.log(this.tableBase)
			var filterResource = [];
			for(var i=0; this.tableBase.columnDefs.length>i; i++){
				if(this.tableBase.columnDefs[i].filterData && this.tableBase.columnDefs[i].filterOption && this.tableBase.columnDefs[i].filterData != '' && this.tableBase.columnDefs[i].filterOption != '' && this.tableBase.columnDefs[i].filterOption != null  && this.tableBase.columnDefs[i].filterData != null){
					var filteredField = this.tableBase.columnDefs[i].field;
					var subArr = {
						field:filteredField,
						data:this.tableBase.columnDefs[i].filterData,
						option:this.tableBase.columnDefs[i].filterOption,
						type:this.columnDefs[i].filterType,
					}
					filterResource.push(subArr);
				}
			}
			for(var i=0; this.value.length>i; i++){
				this.value[i].filteredView = customTable.tableRowFilter(this.value[i],filterResource);
			}
		},
		moduleAction(data,type){
			if(type=='edit'){this.$parent.$parent.inputModal('edit', data)}
			if(type=='delete'){this.$parent.$parent.deleteData(data)}
		},
		permArr(data){
			var result = '';
			for(var i=0; data.length>i; i++){
				result = result+data[i].name;
				if(data.length != (i+1)){result = result+' / '}
			}
			return result
		}



    },
	watch: {
		value(){
			if(this.value.length>0){
				if(this.dataLoaded == false){
					this.columnDefs = customTable.loadCustomTAble(this.value, this.tableBase);
					this.resizeTable();
					console.log(this.value)
					this.dataLoaded = true;
				}
			}
		},
	},


}
</script>

<style scoped>

</style>








import Calendar from "../../hocs/Calendar"
import axios from 'axios';
import { useParams,Link,useSearchParams } from "react-router-dom";
import React, {useState,useEffect,useCallback,useRef,memo, useMemo} from 'react'
import {timeformat,timevalue,formatter,valid_to, percent} from "../../constants"
import {dashboardURL,} from "../../urls"
import { Line } from 'react-chartjs-2';
import { headers } from '../../actions/auth';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
const GradientChart = (props) => {
    const {chart,datechoice,time,listsum,scale}=props
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipData, setTooltipData] = useState(null);
    const [tooltipPos, setTooltipPos] = useState(null);
    const [title,setTitle]=useState()
    const chartRef=useRef()
    console.log(datechoice)
    const customTooltip = useCallback((context) => {
        if (context.tooltip.opacity == 0) {
          // hide tooltip visibilty
          setTooltipVisible(false);
          return;
        }
    
        const chart = chartRef.current;
        const canvas = chart.canvas;
        if (canvas) {
          // enable tooltip visibilty
          setTooltipVisible(true);
    
          // set position of tooltip
          const left = (context.tooltip.caretX+10);
          const top = context.tooltip.y-context.tooltip.height;
          
          // handle tooltip multiple rerender
          if (tooltipPos?.top != top) {
            setTooltipPos({ top: top, left: left });
            setTooltipData(context.tooltip);
          }
        setTitle(context.tooltip.title)
        }
    },[tooltipPos,tooltipVisible,title]);
    console.log(tooltipData)
    
    const options=useMemo(()=>{return{
        events: ['mousemove', 'click'],
        onHover: (event, chartElement) => {
            event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
        },
        responsive: true,
            plugins:{
                
                legend: {
                display: false,
            },
                tooltip:{
                enabled:false,
                external: customTooltip,
                }                            
            },
            maintainAspectRatio: false,
            scales: scale}
    },[])

    return(
        <>
        <Line
        style={{position:'absolute',left:0,top:0}}
            ref={chartRef}
            options={options}
            data={chart}
        />
        <div style={{position: `absolute`, padding: `0px`, border: `1px solid rgb(229, 229, 229)`, background: `rgba(255, 255, 255, 0.95)`, borderRadius: `4px`, 
            color: `rgb(255, 255, 255)`, display: `block`, pointerEvents: `none`, boxShadow: `rgba(0, 0, 0, 0.12) 0px 6px 16px 0px`,
             whiteSpace: `nowrap`, zIndex: 9999999, transition: `left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s`, opacity: tooltipVisible?1:0, 
             left: `${tooltipPos?tooltipPos.left:0}px`, top: `${tooltipPos?tooltipPos.top:0}px`}}>
            {tooltipData?
            <div style={{fontFamily: `Roboto`, fontSize: `14px`, color: `rgb(51, 51, 51)`}}>
                <div style={{paddingLeft: `12px`, height: `30px`, lineHeight: `30px`, background: `rgb(246, 246, 246)`, fontSize: `12px`, color: `rgb(102, 102, 102)`}}>{time=='currentday' || time=='day' || time=='yesterday'?`${title} ${timeformat(datechoice)}`:time!='year'?('0'+title).slice(-2)+'-'+('0'+datechoice.getMonth()).slice(-2)+'-'+datechoice.getFullYear():('0'+title).slice(-2)-datechoice.getFullYear()}</div>
                {tooltipData.dataPoints.map((val, index) => 
                <div key={index} className="item-center" style={{margin: `16px 12px`}}>
                    <span style={{background: `${val?.dataset.backgroundColor}`,borderRadius:`50%`,width:`10px`,height:`10px`,marginRight:`8px`}}></span>
                    {val?.dataset.label}<span style={{paddingLeft:`16px`,flex:1,textAlign:`right`,fontWeight:500}}>{val?.raw}</span>
                </div>)}
            </div>:''}
        </div>
        </>
    )
}
export default memo(GradientChart)
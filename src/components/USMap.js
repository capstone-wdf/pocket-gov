import React, { useState, useEffect } from "react";
import Svg, { Defs, G, Path, Rect } from "react-native-svg";
import { usStates, stateColors } from "./usStates";
import { Colors } from "react-native-paper";

/* SVGR has dropped some elements not supported by react-native-svg: title, style */

function SvgComponent(props) {
  const usaMaker = (statesArr) => {
    return statesArr.map((usState) => (
      <Path
        key={usState.id}
        fill={pathColor[usState.id]}
        onPress={() =>
          props.navigation.navigate("Single State", {
            state: usState.id.toLowerCase(),
          })
        }
        onPressIn={() => {
          setPathColor({ ...pathColor, [usState.id]: Colors.cyan700 });
        }}
        onPressOut={() =>
          setPathColor({ ...pathColor, [usState.id]: "#D0D0D0" })
        }
        d={usState.path}
      ></Path>
    ));
  };
  const [pathColor, setPathColor] = useState(stateColors);

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 959 593"
      {...props}
    >
      <Defs></Defs>
      <G className="prefix__state" fill="#D0D0D0">
        {usaMaker(usStates)}
      </G>

      {/*
      Shows borders between states in a darker color
       */}
      <G
        className="prefix__borders"
        fill="none"
        strokeWidth={1}
        stroke="#FFFFFF"
      >
        <Path
          className="prefix__al-fl"
          d="M687.6 447.4l-48.8 5.1-.5 2.9 2.5 2.8 1.7.7.9 1.2-.4 7.3-1.1.6"
        />
        <Path
          className="prefix__al-ga"
          d="M666.6 361.1l12.9 45.8 2.9 6.1 1.8 1.9v3.2l1.7 1 .2 1.1-2.2 3.8-.3 3.7-.5 2.6 2.4 5.7-.6 6.3.5 1.4 1.5 1.5.7 2.2"
        />
        <Path
          className="prefix__al-ms"
          d="M620.9 365.1l1.3 2-1.3 67 4.4 33.2"
        />
        <Path className="prefix__al-tn" d="M620.9 365.1l45.7-4" />
        <Path className="prefix__ar-la" d="M516.7 414.2l52.3-1.3" />
        <Path
          className="prefix__ar-mo"
          d="M591.7 344.9l-11.2.8 2.8-5.1 1.7-1.5v-2.2l-1.6-2.5-39.8 2-39.1.7"
        />
        <Path
          className="prefix__ar-ms"
          d="M569 412.9l1.2-1.5.5-3-1.5-2.3-.5-2.2.9-.7v-.8l-1.7-1.1-.1-.7 1.6-.9-1.2-1.1 1.7-7.1 3.4-1.6v-.8l-1.1-1.4 2.9-5.4h1.9l1.5-1.2-.3-5.2 3.1-4.5 1.8-.6-.5-3.1"
        />
        <Path className="prefix__ar-ok" d="M507.9 400.5l.7-39-4.1-24.4" />
        <Path
          className="prefix__ar-tn"
          d="M582.6 367.7l1.6-.7.9-2.2 1.2.5.7-1-.8-.7.3-1.5-1.1-.9.6-1-.1-1.5-1.1-.1.8-.8 1.3.8.3-1.4-.4-1.1.1-.7 2 .6-.4-1.5 1.6-1.3-.5-.9-1.1.1-.6-.9.9-.9 1.6-.2.5-.8 1.4-.2-.1-.8-.9-.9v-.5h1.5l.4-.7-1.4-1-.1-.6"
        />
        <Path
          className="prefix__ar-tx"
          d="M507.9 400.5l2.6 2.3 2.8-1.3 3.2.8.2 11.9"
        />
        <Path
          className="prefix__az-ca"
          d="M149 338.1l-.9 2.1 1.3 3.4 1.4 1.8 1.2 5.8 2.3 2.5.4 1.9-1.3 1.3-4.8 1.7-2.4 3.6-1.6 7-2.4 3.2-1.6.3-1.1 6.9 1.1 1.6 1.8.2 1 1.6-.8 2.4-3 2.2-2.2-.1"
        />
        <Path className="prefix__az-nm" d="M253.8 311l-17.4 124.1" />
        <Path
          className="prefix__az-nv"
          d="M167.6 296.8l-3.4 17.5-2.4 2.9h-2l-1.2-2.7-3.7-1.4-3.5.6-1 13.6.5 4.9-.5 2.9-1.4 3"
        />
        <Path className="prefix__az-ut" d="M167.6 296.8l46.2 8.2 40 6" />
        <Path
          className="prefix__ca-nv"
          d="M93.9 166.5l-16.4 63.1 1.1 3.5 70.4 105"
        />
        <Path className="prefix__ca-or" d="M27.8 147.9l66.1 18.6" />
        <Path className="prefix__co-ks" d="M379.4 256.3l-4.8 67" />
        <Path className="prefix__co-ne" d="M347.7 231.8l33.1 2.4-1.4 22.1" />
        <Path className="prefix__co-nm" d="M253.8 311l52.6 6.5 51.7 4.8" />
        <Path className="prefix__co-ok" d="M358.1 322.3l16.5 1" />
        <Path className="prefix__co-ut" d="M265.3 222.7L253.8 311" />
        <Path className="prefix__co-wy" d="M265.3 222.7l44.9 5.7 37.5 3.4" />
        <Path
          className="prefix__ct-ma"
          d="M843.8 171.3l10.5-2.4.5.7.9-.3v-.7l14.9-3.4.1.3"
        />
        <Path
          className="prefix__ct-ny"
          d="M846.6 194.7l-1.7-2.2 3.5-3.4-1.8-1.5-2.8-16.3"
        />
        <Path
          className="prefix__ct-ri"
          d="M870.7 165.5l3.2 12.3-.4 1.1.4 1.8"
        />
        <Path
          className="prefix__dc-md"
          d="M801.8 254.6l1.7-2.6-2.6-1.8-1 1.7"
        />
        <Path
          className="prefix__dc-va"
          d="M799.9 251.9l.5.4.4.1.6.5.3.7-.1.5.2.5"
        />
        <Path className="prefix__de-md" d="M817.9 230.1l7.6 27.1 10.9-2.3" />
        <Path className="prefix__de-nj" d="M823.8 227.2l-1 2.2-.3 2.1" />
        <Path
          className="prefix__de-pa"
          d="M817.9 230.1l1.2-2.1 1.5-1.1 1.6-.3 1.6.6"
        />
        <Path
          className="prefix__fl-ga"
          d="M687.6 447.4l3.3 6 50.1-3.3.6 3.2 1 1.1 2.1-.6.5-4.3-1.4-2.1v-2.5l2.2-1.4 1.7.9 4 .7 3.6-.3"
        />
        <Path className="prefix__ga-nc" d="M689.5 358.2l21.4-3" />
        <Path
          className="prefix__ga-sc"
          d="M710.9 355.2l-.1 1.9-1.9 1-1.4 3.2.2 1.3 6.1 3.8 2.6-.3 3.1 4 .4 1.7 4.2 5.1 2.6 1.7 1.4.2 2.2 1.6 1.1 2.2 2 1.6 1.8.5 2.7 2.7.1 1.4 2.6 2.8 5 2.3 3.6 6.7.3 2.7 3.9 2.1 2.5 4.8.8 3.1 4.2.4"
        />
        <Path className="prefix__ga-tn" d="M666.6 361.1l22.9-2.9" />
        <Path
          className="prefix__ia-il"
          d="M556.8 249.7l.7-.7.1-2.3-.7-.9 1-1.5 1.8-.6.9-.3 1-1.2v-2.4l1.7-2.4.5-.5.1-3.5-.9-1.4-1-.3-1.1-1.6 1-4 3-.8h2.4l4.2-1.8 1.7-2.2.1-2.4 1.1-1.3 1.3-3.2-.1-2.6-2.8-3.5h-1.2l-.9-1.1.2-1.6-1.7-1.7-2.5-1.3.5-.6"
        />
        <Path className="prefix__ia-mn" d="M473.6 182h28.2l36.3-.9 18.6-.7" />
        <Path
          className="prefix__ia-mo"
          d="M484.5 246.8l25.9.1 27.2-1.2 14.3-.8 1.7 1.3.6 1.6 1.1 1.1 1.5.8"
        />
        <Path
          className="prefix__ia-ne"
          d="M484.5 246.8l-1.8-4.4.7-2.2-.8-3.3.2-2.9-1.3-.7-.4-6.1-2.8-5-.2-3.7-2.2-4.3-1.3-3.7v-1.4l-.6-1.7v-2.3l-.5-.9"
        />
        <Path
          className="prefix__ia-sd"
          d="M473.5 204.2l-.7-1.7-.3-1.3-1.3-1.2 1-4.3 1.7-5.1-.7-2-1.3-.4-.4-1.6 1-.5.1-1.1-1.3-1.5.1-1.6 2.2.1"
        />
        <Path
          className="prefix__ia-wi"
          d="M567.2 202l-1.3-2.8-3.3-.7-2.7-1.5-2-5.5.1-2.5 1.6-3.3-.6-1.1-2.1-1.6-.2-2.6"
        />
        <Path
          className="prefix__id-mt"
          d="M188.8 30.5l-4.8 22 3.7 7.4-1.6 4.8 3.6 4.8 1.9.7 3.9 8.3v2.1l2.3 3h.9l1.4 2.1h3.2v1.6l-7.1 17-.5 4.1 1.4.5 1.6 2.6 2.8-1.4 3.6-2.4 1.9 1.9.5 2.5-.5 3.2 2.5 9.7 2.6 3.5 2.3 1.4.4 3v4.1l2.3 2.3 1.6-2.3 6.9 1.6 2.1-1.2 9 1.7 2.8-3.3 1.8-.6 1.2 1.8 1.6 4.1.9.1"
        />
        <Path className="prefix__id-nv" d="M140.9 177.7l24.4 5.4 23.3 4.7" />
        <Path
          className="prefix__id-or"
          d="M140.9 177.7l8.5-37.3 2.9-5.8.4-2.1.8-.9-.9-2-2.9-1.2.2-4.2 4-5.8 2.5-.8 1.6-2.3-.1-1.6 1.8-1.6 3.2-5.5 4.2-4.8-.5-3.2-3.5-3.1-1.6-3.6"
        />
        <Path className="prefix__id-ut" d="M236.5 196l-47.9-8.2" />
        <Path
          className="prefix__id-wa"
          d="M174.6 27.5l-12.7 56.1.7 4-1.1 4.3"
        />
        <Path className="prefix__id-wy" d="M245 141.2l-8.5 54.8" />
        <Path
          className="prefix__il-in"
          d="M619.4 215.7l4.1 50.2-1 5.2v2l2.4 3.5v.7l-.3.9.9 1.9-.3 2.4-1.6 1.8-1.3 4.2-3.8 5.3-.1 7h-1l.9 1.9"
        />
        <Path
          className="prefix__il-ky"
          d="M599.9 322.5l-.3-1.8 4-3.7 6.9 3 1.5-.3.4-2.4-1.7-1.8.4-3.3 1-.5 1.2.6.6-1.2 3.7-.6.1-.9-1.5-2.2-.1-1.1 2.2-2.7v-.9"
        />
        <Path
          className="prefix__il-mo"
          d="M599.9 322.5h-2.8l-1.4-1.5-1.8-3.8v-1.9l.8-.6.1-1.3-1.7-1.9-.9-2.5-2.7-4.1-4.8-1.3-7.4-7.1-.4-2.4 2.8-7.6-.4-1.9 1.2-1.1v-1.3l-2.8-1.5-3-.7-3.4 1.2-1.3-2.3.6-1.9-.7-2.4-8.6-8.4-2.2-1.5-2.5-5.9-1.2-5.4 1.4-3.7"
        />
        <Path className="prefix__il-wi" d="M567.2 202l45.9-2.8" />
        <Path
          className="prefix__in-ky"
          d="M618.3 302.7l1.1.8.6-1-.7-1.7 4.6-.5.2 1.2 1.1.2.4-.9-.6-1.3.3-.8 1.3.8 1.7-.4 1.7.6 3.4 2.1 1.8-2.8 3.5-2.2 3 3.3 1.6-2.1.3-2.7 3.8-2.3.2 1.3 1.9 1.2 3-.2 1.2-.7.1-3.4 2.5-3.7 4.6-4.4-.1-1.7 1.2-3.8 2.2 1 6.7-4.5-.4-1.7-1.5-2.1 1-1.9"
        />
        <Path className="prefix__in-mi" d="M630.9 213.2l32.4-3.4.1 1.4" />
        <Path className="prefix__in-oh" d="M670 268.4l-6.6-57.2" />
        <Path
          className="prefix__ks-mo"
          d="M504.3 326.3l-.5-48.1-3.2-.7-2.6-4.7-2.5-2.5.5-2.3 2.7-2.6.1-1.2-1.5-2.1-.9 1-2-.6-2.9-3"
        />
        <Path className="prefix__ks-ne" d="M379.4 256.3l36 2 43.7 1.2h32.4" />
        <Path className="prefix__ks-ok" d="M374.6 323.3l67.7 2.9 62 .1" />
        <Path
          className="prefix__ky-mo"
          d="M596.7 333.5l1-2.7 1.4.9.7-.4 1.2-4.1-1-1 1-2 .2-.9-1.3-.8m-5.8 11.3l-.7-.7.2-1h1.1l.7.7-.3 1"
        />
        <Path
          className="prefix__ky-oh"
          d="M670 268.4l1.3.5 2.2.1 1.9-.8 2.9 1.2 2.2 3.4v1l4.1.7 2.3-.2 1.9 2.1 2.2.2v-1l1.9-.8 3 .8 1.2.8 1.3-.7h.9l.6-1.7 3.4-1.8.5.8.8 2.9 3.5 1.4 1.2 2.1"
        />
        <Path
          className="prefix__ky-tn"
          d="M596.7 333.5L620 332l.6-.9-1.2-3.2h3.7l.7.6 22.6-2 2.6-.8 17.4-1 5.2-.8 20.5-1.4 5.6-1.4m-103.6 12.7h1"
        />
        <Path
          className="prefix__ky-va"
          d="M697.7 321.1l6.9-4.2 1-.4.5-1.9 1.8-.5 1.4-1.4.1-1.7 2.1-1.3.4-2.2 3-3 2.9-1 4.9-6.6"
        />
        <Path
          className="prefix__ky-wv"
          d="M709.3 279.4l-.1 1.1.6 1-.6 3.6 1.9 1.6.8 1.1 1 .6-.1.9 4.4 5.6h1.4l1.5 1.8 1.2.3 1.4-.1"
        />
        <Path
          className="prefix__la-ms"
          d="M569 412.9l-.6 1.4 1.6 7.1 1.2 1-.5 1.7 2.4 2.5v3.3h-2l1.8 2.5-6 8.4-2.4 4.8-1.7 11.9 36-2-.1 1.4-1 1.4-.9 4.6 4.8 6.8-.3 1.3 1.2 1.8.6.7"
        />
        <Path
          className="prefix__la-tx"
          d="M516.7 414.2l.5 19.9.7 3.4 2.6 2.8.7 5.4 3.8 4.6.8 4.3h1l-.1 7.3-3.3 6.4 1.3 2.3-1.3 1.5.7 3-.1 4.3-2.2 3.5-.1.8-1.7 1.2 1 1.8 1.2 1.1"
        />
        <Path
          className="prefix__ma-nh"
          d="M856 152.6l18.4-3.8 1-1.5.3-1.7 1.9-.6.5-1.1 1.7-1.1 1.3.3"
        />
        <Path className="prefix__ma-ny" d="M843.8 171.3l-.7-1 .5-15" />
        <Path
          className="prefix__ma-ri"
          d="M870.7 165.5l6.5-2 .7 2.6h.8l.6 2.2 2.6 1.3 1.3 1.1 1.4 3"
        />
        <Path className="prefix__ma-vt" d="M843.6 155.3l12.4-2.7" />
        <Path className="prefix__md-pa" d="M757.4 241.9l60.5-11.8" />
        <Path
          className="prefix__md-va"
          d="M822.9 269.3l-.8.1m13.2-4.3l-.6.3m-1.3.2l-4.6 1.6-.7.8m-28.2-16.1l-.6-.6h-1l-.6-.1-.4-.4.1-.5-1.7-.6-.8.3-1.2-.1-.7-.7-.5-.2-.2-.7.6-.8v-.9l-1.2-.2-1-.9-.9.1-1.6-.3m11.6 13.5l.3-.4-.7-1 1-.1 1-.9.4-1.8"
        />
        <Path
          className="prefix__md-wv"
          d="M757.4 241.9l1.7 11.4 1.8-1.6.9-1.6 3.1-3.9 2.2.3 2.6-3.8 1.9 1 3.3-.4 1.7-2.9h1.3l.9-1.4 1.4-.3 2.2 1.6 2.6-.4-.2 1 .8 1.2h.7l.2.7 1 .5-.2 1.6.9.4"
        />
        <Path
          className="prefix__me-nh"
          d="M881.9 138.3l-2.3-1.4-.8-2.2-3.2-2-.6-4-11.9-36.8"
        />
        <Path className="prefix__mi-oh" d="M663.4 211.2l21.4-3.5" />
        <Path
          className="prefix__mi-wi"
          d="M565.6 112.3l1.9.7 3 3.8 17 3.8 1.4 1 4 .8.7.5 2.8-.2 4.9.8 1.4 1.5-1 1 .8.8 3.8.7 1.2 1.2.1 4.4-1.3 2.8 2 .1 1-.8.9.8-1.1 3.1 1 1.6 1.2.3"
        />
        <Path
          className="prefix__mn-nd"
          d="M462.3 61.3l2.4 7.3-1.1 2.8.8 1.4-.3 5.1-.5 1.1 2.7 9.1 1.3 2.5.7 14 1 2.7-.4 5.8 2.9 7.4.3 5.8-.1 2.1"
        />
        <Path
          className="prefix__mn-sd"
          d="M473.6 182l.2-39.5-1.5-1.9-2.6-.6-.4-1.8-1.7-2.5.3-1.2 3.1-1.9.9-2 .1-2.2"
        />
        <Path
          className="prefix__mn-wi"
          d="M556.7 180.4l-1.1-4.5-.2-3-2.2-3-2.8-.7-5.2-3.6-.6-3.3-6.3-3.1-.2-1.3h-3.3l-2.2-2.6-2-1.3.7-5.1-.9-1.6.5-5.4 1-1.8-.3-2.7-1.2-1.3-1.8-.3v-1.7l2.8-5.8 5.9-3.9-.4-13 .9.4.6-.5.1-1.1.9-.6 1.4 1.2.7-.1"
        />
        <Path
          className="prefix__mo-ne"
          d="M491.5 259.5l-3.9-6.3-2.1-3.7.3-1.4-1.3-1.3"
        />
        <Path className="prefix__mo-ok" d="M504.3 326.3l.2 10.8" />
        <Path
          className="prefix__mo-tn"
          d="M591.7 344.9l1-2 1.2-.5v-.7l-1.2-1.1-.6-1 1.7.2.8-.7-1.4-1.5 1.4-.5.1-1-.6-1v-1.3m1 0l.8.7.8-1"
        />
        <Path className="prefix__ms-tn" d="M582.6 367.7l38.3-2.6" />
        <Path className="prefix__mt-nd" d="M362.5 56.3l-5.2 66.7" />
        <Path className="prefix__mt-sd" d="M357.3 123l-2 20.7" />
        <Path
          className="prefix__mt-wy"
          d="M355.3 143.7l-51-5.3-57.3-7.9-2 10.7"
        />
        <Path
          className="prefix__nc-sc"
          d="M710.9 355.2l4.4-1.9 1.3-.1 7.3-4.3 23.2-2.2.4.5-.2 1.4.7.3 1.2-1.5 3.3 3 .1 2.6 19.7-2.8 24.5 17.1"
        />
        <Path
          className="prefix__nc-tn"
          d="M731.1 317v5.2l-1.5-.1-1.4 1.2-2.4 5.2-2.6-1.1-3.5 2.5-.7 2.1-1.5 1.2-.8-.8-.1-1.5-.8-.2-4 3.3-.6 3.4-4.7 2.4-.5 1.2-3.2 2.6-3.6.5-4.6 3-.8 4.1-1.3.9-1.5-.1-1.4 1.3-.1 4.9"
        />
        <Path
          className="prefix__nc-va"
          d="M731.1 317l29.4-3.5 39.4-7.3 29.1-6.1"
        />
        <Path className="prefix__nd-sd" d="M357.3 123l39.2 2.9 46 2.1 29.5.4" />
        <Path
          className="prefix__ne-sd"
          d="M351.4 187.6l51.1 3.5 38 1.6 3.4 3.2 1.7.2 2.1 2 1.8-.1 1.8-2 1.5.6 1-.7.7.5.9-.4.7.4.9-.4 1 .5 1.4-.6 2 .6.6 1.1 6.1 2.2 1.2 1.3.9 2.6 1.8.7 1.5-.2"
        />
        <Path className="prefix__ne-wy" d="M347.7 231.8l3.7-44.2" />
        <Path
          className="prefix__nh-vt"
          d="M857.9 100.1l1.2 2.3-1.1 3.5 2.1 2.8-.4 1.7.1 1.3-1.1 2.1-1.4.4-.6 1.3-2.1 1-.7 1.5 1.4 3.4-.5 2.5.5 1.5-1 1.9.4 1.9-1.3 1.9.2 2.2-.7 1.1.7 4.5.7 1.5-.5 2.6.9 1.8-.2 2.5-.5 1.3-.1 1.4 2.1 2.6"
        />
        <Path className="prefix__nj-ny" d="M827.9 190.5l14.6 4.9-.4 5.9" />
        <Path
          className="prefix__nj-pa"
          d="M823.8 227.2l1.4-1.7 1.6-.6 1.8-3 1.6-2.3 3.3-2.6-4.2-3.2-2.1-1.1-1-2.8-2.7-.9-.5-3.6 1-1 .7-2-1.5-1.8 3-5.4-.1-2.2 1.8-2.5"
        />
        <Path className="prefix__nm-ok" d="M358.1 322.3l-.6 10.6" />
        <Path
          className="prefix__nm-tx"
          d="M284.3 431.2l-2-2.2.3-3 34.4 3.6 31.8 2.6 7.9-99.3h.8"
        />
        <Path className="prefix__nv-or" d="M93.9 166.5l47 11.2" />
        <Path className="prefix__nv-ut" d="M188.6 187.8l-21 109" />
        <Path
          className="prefix__ny-pa"
          d="M827.9 190.5l-1.6-1.1-1.9.3-3-2.2-3-5.8h-2l-.4-1.5-1.7-1.1-70.5 13.9-.8-6"
        />
        <Path
          className="prefix__ny-vt"
          d="M843.6 155.3l-1.1-1 .5-2-3-14.2-1.9-1.5-.9 1.6-.9-2.2.8-1.8-3.1-6.7.3-3.8.4-1-.6-2 .4-2.2-2.2-2.3-.5-3.2.4-1.5-1.4-.9.6-1.9-.8-1.7"
        />
        <Path className="prefix__oh-pa" d="M736.8 225.1l-4.9-29.9" />
        <Path
          className="prefix__oh-wv"
          d="M709.3 279.4l3.2-1.4h1.5l.4-3.5 1.5-.8-1.3-3.6 1.1-1.3.3-2.2 1-2.3 1.6.5.6 2.1 1-.5.7-.8 1-.2v-1.9l-1.4-1.1 1-.5-.1-2.1 1.3-2.2h1.3l.3-1.2 1.5-1.8 1.3 1.2 1.8-1.7h.6l1.8-2 2-3.3 1.1-.5.4-2.2-.5-1.1 1-3.6.1-5.4 1.1-3.4-.6-2 .1-2.2-1.4-2.1 2.2-1.2"
        />
        <Path
          className="prefix__ok-tx"
          d="M357.5 332.9l52.6 3.2-1.4 42.7 2.7 1.3 2.5 3 1.5.3 1.1-1 1.2.4 1.4 1 1.1-1.5 2.3 1.7.5 2.9 1.2.7 2.3-.1 3.5 1.9 2-.1 1.4-.4 2.3 2.2 2-2.3 3.5 1.1 1.9 3 2.3-.1-.7 2.1 2.3 1.1 3-2.6 2.6 1.7 1.3-.5.1 1.5 1.7 1.2 2.3-2.5 1.2.7-.3 2 1 1.8 1.2-.8 2.5-4.2 1.8 2 2 .5 2.1-.7 2 1.8 1.2-.1 1.3 1.2 3.6-.9.6-1.7 3.7-.3 1.6.7 5-2.5.6 1.5 5.1-.3.5-1.6 2.2.9 4.6 3.8 6.4 1.9"
        />
        <Path
          className="prefix__or-wa"
          d="M161.5 91.9l-30.3-7.3-2.8 1-5.4-.9-1.8-.9-1.5 1.2-3.3-.4-4.5.5-.9.7-4.2-.4-.8-1.6-1.2-.2-4.4 1.3-1.6-1.1-2.2.8-.2-1.8-2.3-1.2-1.5-.2-1-1.1-3 .3-1.2-.8h-1.2l-1.2.9-5.5.7-6.6-4.2 1.1-5.6-.4-4.1-3.2-3.7-3.7.1-.4-1.1.4-1.2-.7-.8-1 .1"
        />
        <Path className="prefix__pa-wv" d="M736.8 225.1l3.2 19.7 17.4-2.9" />
        <Path className="prefix__sd-wy" d="M351.4 187.6l3.9-43.9" />
        <Path
          className="prefix__tn-va"
          d="M697.7 321.1l28.9-3.3.2-1 4.6-.5-.3.7"
        />
        <Path className="prefix__ut-wy" d="M236.5 196l-3.3 21.9 32.1 4.8" />
        <Path
          className="prefix__va-wv"
          d="M722.7 296.9l.7.6-.8 1.2 1.5.7.1 1.5 4.4 2.3 2.3-.1 1.9-1.8.8-1.7 3 1.8 5.5-2.4.5-.9-.8-.5.6-1.4 1.5 1 4.3-3.1.7 1.1 2.3-2-.1-1.4 1.5-1.9-1.5-1.2 1-3.3 3.7-6.3-.4-1.9 2.1-2.2-.4-1.5 1.4-1.7.1-4.7 2.3.7 1.3 1.9 2.8.5 1.3-1.6 2.3-8.5 2.4 1.1 1-2.5.9-.8 1.4-1.8.9-.8.5-2.1 1.2-.8-.1-2.9.8-2.3-.9-1.6.2-.9 10 5.2.5-2.3.4-1.6.4-.7"
        />
      </G>

      <Path
        fill="none"
        d="M215 493v55l36 45M0 425h147l68 68h85l54 54v46"
        stroke="#B0B0B0"
        strokeWidth={2}
      />
      {/* NECESSARY TO INTERACT WITH HAWAII*/}
      <Rect
        width="120"
        height="60"
        x="230"
        y="510"
        onPress={() =>
          props.navigation.navigate("Single State", { state: "hi" })
        }
        onPressIn={() => setPathColor({ ...pathColor, HI: Colors.cyan700 })}
        onPressOut={() => setPathColor({ ...pathColor, HI: "#D0D0D0" })}
      />
    </Svg>
  );
}

export default SvgComponent;

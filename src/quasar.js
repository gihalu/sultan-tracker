import Vue from 'vue'

import './styles/quasar.styl'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import {
  Quasar,
  QAvatar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QSelect,
  QTable,
  QTh,
  QToggle,
  QTr,
  QTd,
  QSpinnerGrid,
  QInnerLoading,
  QSpinnerGears,
  QExpansionItem,
  Ripple
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QAvatar,
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QTable,
    QTh,
    QToggle,
    QTr,
    QTd,
    QSelect,
    QSpinnerGrid,
    QInnerLoading,
    QSpinnerGears,
    QExpansionItem
  },
  directives: {
    Ripple
  },
  plugins: {
  }
})

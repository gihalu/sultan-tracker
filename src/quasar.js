import Vue from 'vue'

import './styles/quasar.styl'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import {
  Quasar,
  QAvatar,
  QBtn,
  QBtnDropdown,
  QCard,
  QCardSection,
  QChip,
  QDrawer,
  QExpansionItem,
  QHeader,
  QIcon,
  QInnerLoading,
  QItem,
  QItemLabel,
  QItemSection,
  QLayout,
  QList,
  QPage,
  QPageContainer,
  QSelect,
  QSpace,
  QSpinnerGears,
  QSpinnerGrid,
  QTable,
  QTd,
  QTh,
  QToggle,
  QToolbar,
  QToolbarTitle,
  QTr,
  Ripple
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QAvatar,
    QBtn,
    QBtnDropdown,
    QCard,
    QCardSection,
    QChip,
    QDrawer,
    QExpansionItem,
    QHeader,
    QIcon,
    QInnerLoading,
    QItem,
    QItemLabel,
    QItemSection,
    QLayout,
    QList,
    QPage,
    QPageContainer,
    QSelect,
    QSpace,
    QSpinnerGears,
    QSpinnerGrid,
    QTable,
    QTd,
    QTh,
    QToggle,
    QToolbar,
    QToolbarTitle,
    QTr
  },
  directives: {
    Ripple
  },
  plugins: {
  }
})

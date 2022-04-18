<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="min-width: 80px;">
      <div class="q-px-md">
        <div class="text-h4 q-py-md">To do App</div>
      </div>
    </q-header>
    <q-page-container>
      <div class="row">
        <q-list class="menu">
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              v-ripple
              :to="menuItem.path"
              clickable
              style="width: 142px; height:40px; ">
              <q-item-section side>
                <q-icon color="red" size="20px" :name="'img:/icons/' + menuItem.icon + '.svg'"/>
              </q-item-section>
              <q-item-section side>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator v-if="menuItem.separator" :key="'sep' + index"/>
          </template>
        </q-list>
        <router-view/>
      </div>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>

.q-header {
  background-color: $navbar;
}

// to make everything on the page the dark color
.row {
  background-color: $primary;
}

.menu .q-item {
  margin: 0;
  padding: 0 0 0 20px;
  transition: none;
}

.menu .q-item:hover {
  background: linear-gradient(269.96deg, #4D5255 -3.6%, #4D5255 97.98%, #FDCBB2 98.01%, #FDCBB2 99.66%), #FFFFFF;
  transition: ease-out 400ms;
}

.menu .q-item__section {
  font-size: 15px;
  font-weight: 400;
  color: $secondary;
}

.menu .q-item:hover .q-item__section {
  color: #FCF3D7;
  transition: ease-out 400ms;
}

.menu .q-icon {
  filter: invert(65%) sepia(14%) saturate(528%) hue-rotate(155deg) brightness(84%) contrast(79%);
  color: #78909C;
  transition: ease-out 400ms;
}

.menu .q-item:hover .q-icon {
  color: #FCB352;
}

</style>
<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "MainLayout",
  components: {},
  data() {
    return {
      menuList: [
        {
          icon: "search",
          label: "Search",
          path: "/search",
        },
        {
          icon: "settings",
          label: "Settings",
          path: "/settings",
        },
        {
          icon: "help",
          label: "Help",
          path: "/help",
        },
        {
          icon: "dashboard",
          label: "Dashboard",
          path: "/dashboard",
          margin: 40,
        },
        {
          icon: "done",
          label: "My Tasks",
          path: "/todo",
        },
        {
          icon: "calendar",
          label: "Calendar",
          path: "/calendar",
        },
      ],
    };
  },
});
</script>

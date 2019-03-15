<template>
  <transition name="pop">
    <div class="userCol" v-show="isShowUserCollection">
      <mt-header class="mHeader" title="我的收藏">
        <mt-button icon="back" slot="left" @click="hideUserCollection"></mt-button>
      </mt-header>
      <div class="content">
        <ul class="cellWrapper">
          <li class="cell" v-for="(collection, index) of collections" :key="index">
            <div class="title">
              <span class="tag">{{ types[collection.tab] }}</span>
              <router-link class="link" :to="{name: 'TopicContent', params: {id: collection.id}}" @click.native="hideAll">{{ collection.title }}</router-link>
            </div>
            <div class="inf">
              <span>{{ collection.create_at | dateFormat }}</span>
              <span>{{ collection.reply_count + '/' + collection.visit_count }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

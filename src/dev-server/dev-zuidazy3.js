const { HttpCrawler } = require('http-crawler');
module.exports = () => {
  const imo = new HttpCrawler({
    meta: {
      name: 'zuidazy3',
      version: '202007081',
      home: 'www.zuidazy3.net',
      zhName: '最大资源网',
      search: '超电磁炮'
    },
    option: {
      delay: 300,
      errRetry:5
    },
    steps: [
      {
        url: 'http://www.zuidazy3.net/index.php?m=vod-search',
        method: 'post',
        dataType: 'formdata',
        data: {
          wd: '{{v-meta=search}}',
          submit: 'search'
        },
        resultModel: {
          home: '{{v-meta=home}}',
          title: '{{v-resp-html=.xing_vb4|[*].structuredText}}',
          router: '{{v-resp-html=.xing_vb4|[*].firstChild.attributes.href}}',
        },
      },
      {
        key: 'voides',
        url: 'http://www.zuidazy3.net{{v-prev-resu=[*].router}}',
        header: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36 Edg/83.0.478.58",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        },
        isMergeResult: false,
        resultModel: {
          name: '{{v-resp-html=[name=copy_sel]|[*].parentNode.structuredText}}',
          url: '{{v-resp-html=[name=copy_sel]|[*].attributes.value}}'
        },
      }
    ]
  });
  imo.on('request:err', (e) => {
    console.log(e);

  });

  imo.on('go:after', (result) => {
    console.log(result);

  });
  imo.run().then(res => {
    console.log(res);
    console.log(imo);
    return res;
  })
}
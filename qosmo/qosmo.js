Chart.register(ChartDataLabels)
const m = {

icon: {
c1:'filter:invert(90%) sepia(1%) saturate(30%) hue-rotate(75deg) brightness(93%) contrast(86%);width:31px;',
c2:'filter:invert(73%) sepia(88%) saturate(2601%) hue-rotate(130deg) brightness(94%) contrast(84%);width:31px;',
calendar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACHklEQVRoQ+1ZTSsFURi+txApHwuyUSTs5GMhNhbY2KBkZyM7/8GGrbVSFmwlFrJiQ91SCmVnQ8lKsZDPBc9bM7dpmjkf78yZmVNn6u2e230/nud9zplz7ky5ZPlVthx/yRHIW0GngK0KdAL4IazFI/CHz13YhiKhLfhNwfwZ8IzxDOxdMb7qxp1Cs8hwFCp2g+9DigBeA+T9kEEMbhXjExOY8xQI1qPiBELleoNTc8iRyFMTtC6uAo5AVgo0odAqbBzWENC2DeOBkNa0AC8V9Z+AX03Il2KDi5jGZ7Bt2HdcXtEUakfQBaxPEZQptwoST8M+ogqICOwhYMkUKs286/Bf0yUQdavTrJua+zUyDesSoM2pKNcDgHTbTOAR4LtsJsBSgG5howWYQzSV92HLugoUALscAvcoIc+ckYeIQC8w9GeEQ1SGphAdFJ90p1CR9oHYo7pIgSLtA9bfRh2BvNeyU8ApkLADbgqJGviDH3+ZHa5DXK1CrDEF6D/zZAICjd4xoUdCwhiBHRReUeigyOXUa4LIxxGI6471CtyB2SLskzmNWhF3AuvIaw0wcWuHGVsD2kiYAY4As3GphTkFUmslMxFLATrjqJxTmJi0wu7hHfmYX/Sn/gpBI1plzDkfIPVCVHoRAXrteQzL++HXFzCMwSJfAMrAzSNwExb5aNtcw6uZaaenV1zncbVkBPw42urrMwAcLEHvyF5kNf8BXD51Mc+COjkAAAAASUVORK5CYII=",
down: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABL0lEQVRoQ+2WwQnCUBBEkxq0BBEEBW1BK7AIC7AT7xZhB1qCgoIHSxBr0Pl3ibt/dpHABPaU/fPnzeSQtun50/bcfyOAfzeoBtQAmYA+ITJA+rgaoCMkBdQAGSB9XA3QEZICaoAMkD6uBugISQE1QAZIH/c0sMZte8yAvrVb4IXXG8zBco8H4AHBkUU0YKfcNbboeADOEJxbRAN2LtBYWHQ8AFMInjBDizCx88TZJeZm0fAAFL0Z5pgIUcyvMFeL+bLjBciEcJuvBciAqDLPAERCVJtnASIgKPMRAAwEbT4KoAYixHwkgAcizHw0gAUi1HwGQBdEuPksgG8QKeYzAYr2BLPDvDFbzN36e+DZq/mV8Oin7wogPeIfF6gBNUAmoE+IDJA+rgboCEmB3jfwAWlVLjHI5tR5AAAAAElFTkSuQmCC",
filter: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABhklEQVRoQ+2YQWoCUQyGnS4UStFV8Rg9QHuBUu0ZLIh4ADe9QBfitqta9A66cNFlL9CjWLpx5x+YASkzY/KSp30lAwFxkp//y8vMPF7WSPzKEvffcIBzr6CvgK+AsgM+QsoGqst9BdQtVAr4CigbqC7/tyswRGsmiJa6RXKBHUpmiDmntGoFtihucwQi5XxDt8PRrgJYobjHEYiUs4Zun6NdBXCF4g3iliNinPMJvXvED0e37iE+B4TIPAEeewudEkJsngNAOaeACDLPBYgNEWxeAhALQmVeCmANoTYfAmAFYWI+FEALYWZeAxAKYWpeCyCFMDdvAVBAkLmbmk//F+7dcbcHnC1EkXPsS8zVWiBxUJO8xL0nrpgkzwHybvkKSMbmMNdHyEcodHbyOh8hHyEfIWUHfISUDbR6Cz3Dx0vKm7kmzL8i6FC47Przu9HC9CN+0Kny9S+KZADIdxfxjng4gHjD75Fy3EvLrZ6BMvEx/pwiaLzopPsjNQDye4m4QLBOmkMA9weGUDE0Zvm9AAAAAElFTkSuQmCC",
home: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEGUlEQVRoQ+2ZeagNURzH37Nlz/ZkCVlSRChZsryUvyT7LrwQIlFC1mzZIltIIUvIs0vxl6SUKCVRlCxly76/EL6f60xN05y5M9e9d3o1v/o2M+d3lt/vnN82M4UF5ZwKy7n8BYkCcZ9gcgLJCfznDiQmlGYD64tfWXgZYqObq08tT79Xen4TNDZXJ9BZi+4WepjFH+g6T7hgEaan2q8JXnk+qq2RUGZTIhcKjNFi+4VqnkX/6HmVsFLg3k3D9XDSImQDtb/NhwJsxmphSRpzQdBJwjdXv9gVqClhjgiD0gjvsG+Zvs9MQ6wKtJQQ54UOIYV3ur3QzRDhhhCbAsXGdrFTP3qqxq9COwsf55ws/DDz+HXLmQ/M0GrbBcKkH5WqscQIt0nXuQEnRATqZeFnXYFKWmirMMuyIBFmubDGw2enCa1VAhTJ+QnUM0fdzyLEF7VPEM66+EQnJ2yyy6eFhhGUyNoJtNeiOGtry+KP1U4UumP4LXTFjOoIo4Tbpp2Me04g2YWhrCgwUCsdFbyp3hHgqm6IJE7a72tOqsh0wJFLTBtN1YWDwogQGvy3Agu0yDqhgmWxPWqfLfw0/Om67hC8zo0ZkehWCNxjWsvMc1BFwCZY66GggVU1cK8w3iL4L7UTWXYaPs69TZiZZlfPiD9RwF+gYcIhoYZl3CW1jxU++PFtCjRWZxyxm2XSd2ofKVw2fKrOE4LNub3T4CeDhUeG0UlX/AK/8SOKQfzrvpfpp0BXM1kTy2T3zGQPDZ8MjHOTkaMQZsEmXDGDMBUiVG/LJFSmnMRFN9+rwDgx9wmYjx9RDtPns2FSChwWqIUyIcxwjrDLDMZvuJ9qmey32hcKJMYUOQrgoCSeRQFSbBBvscAk0FKB8jgbJbk3EBAUtggVLfKwadOEMmfxA3qgxPUj6hV2hGoTIgTSn+PPJhGKCauvzaT9dSWP1LUsQv9iRwHsuZVPx+dqw0xuGh5JCOfukk3JXXM90T3O7SS9NrrHv/yKQaJYkaMAKZ6I4q5TKHOHCigBZVIGZKInSQ9rOGUG19b1mDDAM9loPZe67XeKGoj7EOaC2TjvotwT76MWYpkowBjv6yc+ul6YbyZcq2vqzc/rgCQhdoA07xCdg5w7UyHDjDuuTrxjO0Qu6ChQGaSCSZgIQvzlGOMiKuD3tsXDKICz2NJ8PpTKuBZyhIuqwHcNJPX7Edk66mnmXQGKMwo2PyL88kUiCuVdAb6yXbdIyFc2vkZEoUSBqD6QnIDHvhITSkzIZRKxRKFPEsD2OcUvHGbbiXnf5h3cl8KUErw49IkQuLurL6W4H/FFjt9GYYmPw7YX/dQcYRRopn68PjYNsSrC8c3U9kuI9TYLbUPMxV+ZjcLdoL5hFAixVnxdEgXi2/t/K/8FWS3YOYVA47MAAAAASUVORK5CYII=",
layer: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACSklEQVRoQ+2YjU0DMQyF2wlgAzoCTEA3gA24DWADygawQdkANigTwAjHBrAB/ipHOpncnS+X659iyapaJc57dmzHnc+OXOZHjn9WCOw7giUCpxyBcyF3I7oQrUXfRX9yE57iCgH4XrQShUQQwK9FX5RQFi45CQD8UYH3gYPIUw4iOQgsFTifQ2WjRPhMkjEE7tTbKcAtWAgQldehLFIIAHwlypXJLbXadhPxEiAZScwH0WZi5iYQ7JHwz6IkfGfl6iOAl2MVZSrg1m5v5WojAHBvRdkVGXLkX+WKEbiUhZ+7QpVwzpXs+Qr7YgRIULx/qEIUwLiVk4wAxMgBWFIyD0UorWCqm4A8VYjSWYme7YHJr5xJOV1b4F1XKIaT2g8RdBdEAnDAj+oDMTJEg1BeTBCRb7WNx13Sd4W6jEAEvXad1L3oQ6+JG7j3Ci1kYejE1F5CymDSlKV6LYUIwInmxthkEOK60pMg1TpDpHTiWg+1Dy7IAsZTuaIVRfdiA1tWIJK1E0MkeKeZaBweq1wkJuuJInuDhIdi1QLcEsneicPLEa9aYLcKit/fRC1RojX0hTtpJ46G2biQCI15KPZGgPM4ZCXquc82xHzH2yhJivexR5ITETRFSicundhxb0ontk4i+Uonjlyd0omDU3LMxKUTO6pTc0npxAMdNmp5mYlj7qv0oVdm4oZ3JpuJPRd4qRHJORN7zt2uGfOvROzZsZIfPTNEWyd2A+9qZIONmA28n4bMxKPOyxkBC4RhvWsmHgV8yghkAeY18gddusAxhfMn1AAAAABJRU5ErkJggg==",
list: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACLklEQVRoQ+2ZzysFURTH30NCEiVCsrGRhYWUJbKxt5Kd2FCsZIeVZEPZ+LWSrGxZiWSDjSzeH/DKj5Rig0R8T915zVyZOTN3xpuZzq3T9Lqfc5wf9849c2UzCR/ZhPufkQCKXUGpgFTAMAOpXEI9SEqDR2JuMX+tMfX43Q0pM0zqX+qPmLjSJ/UKrAKYZjqwCG5Bse3KeC1TNyi2BsUZu7IewCsmK5nW78E1K3YWz2Wmngn2BuUqtwC+fVh/Blun+HlbNXyYCIQ6kq5XQAIIlFN/SlIBK1+yB/ytnALtuoTogLJejV72cwA6FTSB54aXQgjzd7DR4vYaHcLkOoRzEpPTZ8pYBZ67kEFIlCfxFOwfuQUQQpL+10TqmjlqI0YhjR55pL2yB/mwcbFo5g7hEO0DztgHNKLA2DRzn3ColOM9mCcIZZ1GIpu5Fzhutc+JbOYkAOZS1bHQmjmpQBQV+ILREqZh+1soNpv4GM4PMAM4ADes2Ng0czVwaIx5Eu+Ao0sAGtLMMav+C0tdM9ePEOlyi/M9MAnuQqWkHE/6oIn6e4AutU7sZdArkMdkK7OcN+C6FEv7ZpupZ4KRf21uAci9kEl6mbqhtRJyrcLMuI5JBayMxHIJ0f07tQWc8QCoSYFzeC5xlAyZd+g7/n+hnwObAMaZf2QFHH0L0+iAXEKqmbpBsS0oUuNYGHoA9LsPwjmJzzUv6MqvFxLlzdwp7DvOqtT1QkFLWzS9xFfgB46vejFVRQwlAAAAAElFTkSuQmCC",
right: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAE4ElEQVRoQ+2aecgVVRjG3dLSRG0XgxBMQUWwlDATUSslRXMlNXPBMBQRlcQF9HOF7B+RUojKPfdwQQ0sBQ0KXEpK0SK3SkUL9xLXnt9l7uXc5cycMzP3I8EXHrzfzPu+5zxz5rzLGatWuc+l6n0+/yoPCAQr+LD+bSO8KLwgPCM0EOoK14WLwnnhR+GAsE+4msbqJ1kBbF8XBgm9g8m6zumGFLcJXwhbhNuuhoV6cQhg86ZQIbSKO7Bh95t+zxZWCnd8/fkSeF4DLBVe9h3IQf9n6QwVDjro5lR8CIyR1Xyhts8Anrq8SnOCFbnrYutCoLocfSS85+IwJZ0v5edt4d8of1EEHpKDDULPKEdluP+dfHYTroT5jiKwTMbvlGFyri53SvENwRqlwghUyHCG60gFeiz9ZGGP8KowT2A148hnMhppM7QRaB8MXi3GiLeCp/a1YUvYXZeAxADZri81l1IEiDKHhCYxJo/JIoGIVSh9dGGtUCOG379k00Igm+dJKQIV0oj76uB8kvChZZL9dX21QGTzlU9l8G4UgfpSOCnU8/Vu6JOI2gk3LT7e0nWyri8JNnJT4YTpt3AFpuvmzASTz5p+pR+8MrY4Plj3lgu+e6xoFQoJHJfTxikQwMVeoYdgi+OE5yWeJKhgnzYfjEngJd34PqXJZ93s1w+S0d8Wv8N1nTAZlY9Mc/YRyTUjpiGxekrKBHB3WHhNOGvxTYz/xIPEKulSZhQRIOuRdMohlMxdhFMW56N0fbEjiV+k16wUAZb5sXLMPvD5R/CAjlnGGK3rHzuMf086RMlMR5d9hR7Xb5JFmNB0EMMjK8QQJ9cixhmr+wsdSNC2/mASIOv+GmK4VfcqqyKdqrHmRpDgddxlEqAhp9G2ySzdSJKdHR5qToXccE54MsSor+7RM+Reof8TAeZFxOJkwyb9dGOjSYBel91tE5Qxqgxx2QdEy29MAk/ojwshs2PnTxTWCEk2MfXRPyHj0NR/LkSVGJw/ZZp/M5Fx+EQxVy7hAXUVMtGjhPjURxyaXSokwK7uVKbZ/ym/LPtRi/+Bur5CcKlQSYq5XsVcAY5M3i8DAQpEJp9XBhvj0G1xQucyecxoiijJM2IS6KC/6WHTlCNyRh10xuKUcMi+8unSeNUgXEQAMqeFZ1NiwCbjnbdl+Dh9MgHkKYGMXkSAC2lVpN/KF73AZcvDIKtTEvueVNDJDTF9FtbhZD/e1ToJVoHXpq1gC5fddY8sWtNzDI4aaezzAkGpRiLpZuY86APL5GhuNgm1PCePOu8973+elCJAqUoT0ijGIJgsEMaXsOVbwmaBjyG+QlvaUvjdhQA6PKkdvqME+ny86CxwtpkVqkcq2kdi+qRro/UskrBelCc5LuaANBscbhGWCaPU+HEnH1qHhRGgHmGz9YpJIg0zDhlYTWv9FXUawDHjdqFjGrPx9PFTMPnQTjGKAGMSMTiEIuVXluzWQHw4tOWR3DxcCKCMHh3ZNMEn7fsSpmzncHiCYDuazPPpSiBrROfGR4/mvjNz0KeMGSFkGhVX8SWAX9L/sGA1nnMdKESPI3OSJ0/eu1mKQyA7F4iwL/jQTaj0qWsoCwixHNNw0sbX/FiShIA5IAdirwi0eq2FhgLd3aMCNRHdk/lfDSj2OHlILGkRSDyRuA7+A11O0DEYsEOIAAAAAElFTkSuQmCC",
search: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAD/klEQVRoQ+2ZWaiNURiGzzFHpgxF5CjkgsxDuJA5RZQMuXBCpKQQcUOUMUXJjcRBRGS4MaaOQmYyRCQhU+Z5Hp5Xe2db1tr/Wvvfp7NP7a/e2v/6v/V+613fGv9dWFDBrbCCt78gL6C8M5jPQD4DMXsgm0OoDm2pByqBV+BNzLZ5VY8joDkRRoMhoBNoYER8zfMlcATsBHe9WhTolImAtsRYAMYketsn5C+c9oBF4KpPBV+fEAFVIJ2XaHxV3wCG3w+eVySEfM2Q459qvgI0vneDgdkICscJMAK8iMvnI6A2QUpB57jBjPo3eO4DXsbhjRKgFeUgGBQR5D3vL4OHQOO9CegI6kbUUyb6gW+ZiogSMDcxZl38Z3ixHBwA5pjWnBkMNG/U0y5bzIuFZSGgCNKboLqFXJNRK8oS8DMiuDppFlgGbJP/O+XtE7GCdaTLwAbYJlkYNURGgv2B0frjfwgoM6ZpnxgbyPfH3SVAY/epo/fjpHwOnCstDVUWm4HHoSJcAooh2mQhu0ZZBxA1bNK14zQve1gcZlK2JlsCSiCaYCGb6BAWEncUzrssFfZRpqEZZK4MXIFFE8s0nXdirdvUrwHeAnNC36esRVDrcXYJeMa7hgbZPZ6LQgM4/G0dpL2gWii/S4DIzNXiAmVdQwM4/I9Rrg3MtFoUfAyJ4RKgnVVkqaYJbBtWIfGSvtqBexsVtTBoWAUtEC4BDyDSspZq73jQ8qp9IK7pyNHUIHnOc6NQYpeAoxANsJB1oexiaBDDvxXPty0c5yjrHsrtErAUovkWsrWUzQgNYvi7uFfhp40uyFwCtNFowzHtEwU6Zd4KivLXWcukbmQ6opumq+nhUN50ZyE1srWFUJNZAoNWC/y1RGrydrNw3qGsDQiawOJJJ0A7cYmjR9RT44C+PviYenwzcO2003m3zofI9EknoDLOmlj64mAzbWwSeTwicE/ebwG2bKqqvlwooxldaqIuNO0gPg9sd4Jku0/yQ2ebs+ARSN7ItOnp3NM3jUANmaGgFHzJdgaSfDqnbwdRYjOJn6yj+TQFbAsl8W3UVIg1RjWsysqUjWKwNSSArwBxDgOaiPVDAlh8dZr9APRlz7RgESECFEzbvzKhbzqZ2F4qTQMbgca+zYJEhApIBtSRYjYYDsxDn9koTU59FFsNdKKVqa52Xpd5i8hUQDJwTX70Avro1RLo67RWIR3MnoBTQDv6Z6OlirseTI4rIq6ANPEjX2VFRHkKkEJfEePx3WHrkvIW4CtCV9zGuSrAR8R1nHQq+M9yIQPJRrmGk3pf92edgnNagC0Tarw+STr/1cmlDKRmQkcX/ZWlG6DuCk7LRQGR62+qQ15AUHeVgfNvkCWrMdeLotIAAAAASUVORK5CYII=",
signout: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACwklEQVRoQ+2YOWhVQRSGExFioWhUtIqgdhIQt6BV7CIuhWBQTBswilZuYGwUxCBauTZ2LoigjakDaSzUyoVokVILTcAFBAXxO+G+EMZZz+Q9GbgDP8mde87M/83cO3fetLcVXtoL999WA/zvGaxnoJ6BzBGoH6HMAcxOj52BpfS0Bi339DjNvdcRjpYRsw69Qb8i4r0hIYD9ZJ9EO9CCiM56iHnhidvIvTHUWcH28fdTRLvOEBfAEjLuo32Jje8lftSTc4t7R+fc/8D/O3MgbAAd1SjJqKeWEMA9GhwwGs2CsAFcp4Pjqc6reA2ApKohTID1NDaBFioAfpOzCb315NpmoBGugjABztHaJYuBV9QNVyP1x2HwO/WyEvmKD0A1EyaAvIC7DQcfud6AvipmxUwJASRDmAAvaWGL0etdrgfnwbw0EQOQBGECyIeo2zB7levTLQaIhsgFWEVPothymUBZqWJL8MXOATiPi4so9DWPNeuK80JoAeRj9wNpllsNkBNCC7ASF581TjJyrBAlAVhf7NIABOI9kl3vN7koEUB8n0A3SgY4jPmHpQI8wXg/mtmTlfYIPcXzQSQ735miBVhB7peMJVGT+o/5HAD5fTyF5Ad6K4rVfA6A5O5BV9DqBILFxMpXPKU4zecCpJhoxMZupxvxXvOxANcIPKVxa8lJAQiatwE8p3K70fEjrg+1GCDKvA3gMZUHDLM/ud6K3s0DRMwMRJu3ARyh8o7FqOw75FBKdoSuH/WyKj0LQIYAkszbAOTIbxJpl8decsc9ED6AZPM2AKk7hm4qHxftwZbKvAtA6m+jIQWEBkBt3gcg986gC2hRAkgIYIS2zs5pL8t8CEDudyE5Td6F1gbeDTmV21a9Qy5mOcGQlW4zeoDkDHZ2Y5YwULOhzT5R0HhKyqkBkoarCcH1DDRhUJOaLH4G/gJOga4x6zJELgAAAABJRU5ErkJggg==",
sort: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACqklEQVRoQ+1YS0hWQRT2kY+FLsJEfGxatLNWRm3EjVJgubCl5K5NRFBEtLCNkG1KUBA37iOCdtHGJIgQxEDwAUarHhCp2BMVyfo++Yvb9Z/mnPln7q8wAwfunfnO4ztnHvdOackBb6UHPP6SSKDYFYwViBUoMAOaKVQPX2uQHYHPKmBaBDgNhH7fQn4mlaQEbkHpLuQppBey+R/PFRhbhhzVRCfEPgOuU0vgNhQGE0qTeO6BbBicNqP/vTAgLew7FGo1BBg4CaTbc3Scg/zIM7ZvCHDKcOqY2gsMdEO+pQANeP+oTa0Q/xm4w5IK3AfousDoNDBnIV9T2FG8twv0NRAu4geQezYCIwBcVVieAfYMhNnJvKV3oWFEcM0hile5jJsWtoNJmUqSQBlUtiCHZKp7UF3o4Q6VaUtX4CK8n4eQzJ/G98pUVFN4X0/0vcYzd6t/DpksmEgOslUEUpcK5iTeZy0B8jSW2M9nhonYliRA4kBLgNV7CTktCcCA+YX+IciAzUYIAk1w+sHmWDA+D8wJGy4EAX7EvbM5FowvAtNqw4Ug4OtTYgHBHy8GAW7DS5BjNueW8XGMX7bZCFEB+uS221jALsQdSLSOQhGwJc7beCTgLZWOhmIFDInjCdohXMT8v+afHz/L1S1EBXh78UkZyWPgLyh1duEhCLicxE8QC/+x1S0SyJOyGvStQKoV6ZwA9pIC/xcaogI03gY5JZyiXMSPIF/2EwGXWJx0QlXAKRgXpUjAJWs+dUJVwLSIeYP3EMLrGy8tBAHbNsrPjDteohduc9pbCdtJPAa/VyKBXAYkU4i/drwqSTZed/DaI187gk6exKbGm+8bWVagD876IeUQXjjNQW7mnk1xmD6nuYip+yZLAr58BbEjmUJBHPsyGgn4yqSrnd8bxo8xPmrC0QAAAABJRU5ErkJggg==",
},

login1: () => {
	const a = el({a:'div', b:document.body, d:{style:'position:fixed; top:0; left:0; width:100vw; height:100vh; display:flex; align-items:center; justify-content:center; background: url(telkom_night.png);background-repeat:no-repeat;background-size:100% 100%;;'}})//  background-image:linear-gradient(to right, rgba(190,30,60,1), rgba(150,29,51,1));'}})
	
	const b = el({a:'div', b:a, d:{style:'background:rgba(255,255,255,0.9); box-shadow:0 0 5px 3px rgba(150,29,51,0.5), 0 0 7px 5px rgba(255,255,255,0.3); border-radius:11px; display:flex; flex-direction:column; align-items:center; padding:0; margin:-10vh 0 0 -5vw;'}})
	
	el({a:'div', b:b, c:'QOSMO', d:{style:'background:rgba(255,255,255,0.9); border-radius:50%; box-shadow:0 0 5px 3px rgba(150,29,51,0.5), 0 0 7px 5px rgba(255,255,255,0.3); padding:15px; width:95px; height:95px; margin-top:-49px; display:flex; align-items:center; justify-content:center; font-weight:bold; color:rgba(100,100,100,0.5); text-shadow: 0 0 5px rgba(200,50,20,0.7);'}})
	
	const c = el({a:'div', b:b, d:{style:'display: flex; flex-direction: column; gap: 5px; padding:3px 57px 29px 57px;'}})
	
	const d = el({a:'div', b:c, d:{style:'position: relative; padding-top: 20px;'}})
	
	el({a:'img', b:d, d:{style:'position: absolute; left:7px; top: 31px; width: 14px; height: 14px;', src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACCElEQVRIS7WVyytEcRTH3XlR8ioLjCZ/gKSGrFhI2ZhpxkJWhIUFKzZKoSQbjwVqViysmOZxZyYWsrBmFlY2iCYkS0Lm5XMXauI+fnMnt273d+85v+/nnN85pyuV/fMliei73W67y+WawHcwn887JUl6yeVyxw6HYycYDL7paRgCPB5Pvc1mO0Kk87cQsGur1dofCoVutSCGAJ/Pd0LEfTpRXhFAO5l8qfnoArxebw8Rngkc43gkEtkrGkD0i0S/ZATgqPaj0eiIGcA6gBkjAHaZDHxFA/x+/xSbtgUAmwBUAzGqQRM1uAFQoQfJZrOdsVjsougMlA3UYZpj2tICcP4bnP+sqTZVZgBxq8ViGUBgjXVtgdAH6xXuABmUk8GjcAa0ZxWiAQSHiVCZ1CkmV6bfe3g6+fbCFJ+l0+kOfHaxO7mVeRkNh8NPhSDVGlDcME7+QkdE73g/ReSZdR3Pbt5bf/kk7XZ7F0OX/fn+B0D0HRT2XKBzVF3IcFiW5QNNANGvYpwzC2BfkJYd0gOcYuwtAXAPoEUPoHRDYwmAskwmUxmPx98VjT81oO/fKGBlKQDatoG2fdYCfAIoLwVA+zYnEokHVQBFvsTQZhZAC78y2TXsz2sBxjAow2PqArAMYEGzyIqBLOZxnOSoqkUp+H/ie5hKpWaTyWRaFyAqKuJn+E8WEdHz+QZ+4MQZun8CHQAAAABJRU5ErkJggg=='}})
	el({a:'input', b:d, d:{type:'text', placeholder:' ', class:'LoginInput'}})
	el({a:'span', b:d, c:'Username'})
	
	const e = el({a:'div', b:c, d:{style:'position: relative; padding-top: 20px;'}})
	
	el({a:'img', b:e, d:{style:'position: absolute; left:7px; top: 31px; width: 14px; height: 14px;', src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACu0lEQVRIS7WVS2gTURSGO5mEGIsYQYsu3AhqqxXciQiaIkYJ5IWEakEFwZULFR+g1T58FKmKotu6EFHESJ5W0IVk4aOuRaWuBMWFSKnSajFD4nfD3OE6zZAx1oHL3Dn3nv8759zHaC3/+dGc9CORyFKfz7dP07Qu5iyn/aD/ivf1bDb73m1c9QBaMpk8hUAvLVBHaAbbLiB5N5A/AIlEIojTHSKNSOdqtTrJ9xu+V9LahB3bdKVSWVUoFD43gliAVCqll8vlx4htVcRL9JO5XG4yFArNCwaDNxnvMcdPk8UF14B4PD7s8XiOqw6GYXQWi0URfe2JxWILmDMBxMvnAwApVwAcV+u6LoR01YFSLBLRqzbW5wvfS2gZADtdAaj9NaI6ZNb3BcL9RDrt9XrH0+n0hBQhyw3Yx8x5V4AfcwUgqndMbKd9QrQD0SnpGI1G24EHEF7Lexj7MhOwHcATVwAymMHZT+S3cdqrOjG2m7G7ttK9ZV4ntqpbwBQirQBKOIqDZT0AjjJ22QboYl6pkbgYr21TSvSM1ybRZ38fyOfzI6JPzdch/pS22AYYADCo2tDow9fAd0i11wAIdVPje3KATMYR/c73eprPIdJ+dtFZM0BR1lvmvIvYT0of66BRiquIHq4nBvAj9iOMH+RtlRB7H5mcE/eW3+9/ztgKswqXyOSEVSIpSpo76O+ndeBs8BaXWpFL7z476xc7aj677KENcgbIeXy3YVd31RCZ9Drepg5laXGA3CC7bnzaCOyrXDP6PX8NEGAB4eSPIhSyLz7XywhZloSddd3cFMAJQsSDlGuAi3OhmENZvzUNkBCifUR/i8xEQmbtIqeaN7Kba2KHWOfknzKQ8HA43MozqmbC+mzMZDJjcwIQIBvkJ6Vaw3p8mDOAgLC4Af6KexB/yUF7PeugNap3M+O/ATImLoDpOXN0AAAAAElFTkSuQmCC'}})
	el({a:'input', b:e, d:{type:'password', placeholder:' ', class:'LoginInput'}})
	el({a:'span', b:e, c:'Password'})
	el({a:'img', b:e, d:{style:'position: absolute; right:7px; top: 31px; width: 14px; height: 14px;', src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADWklEQVRIS82VX0jTURTH/elmGpL5lJr2UEp/QCNHf9SHJkQ2UedkolAEVkhQpA/Wg0baQ/RWRD5EWfRU2WT/xCYktKLSIlKKHqxekswicFBi29yfPtfuT9ZwuiKhweWec+4533Pu95zfnZKwzD9lmfET/u8ENTU1B7Ra7T2LxTIVi4l4b6BUV1dnhcPhDEVRArOzs5MA65OSkhwATwWDQbPT6XywUJKYCQwGw6qUlJR6QM2A7iQ4PRIAexi7iA+GQqFtDofjdVwJdDqdNjc3txXnk8RnqEHgzSCPYlvPnhkBds1mszXFRZHJZNqM4x1WIYCfAMsWgchdPp+vXaPRrIaWDuyHpP071edDzxd5Yzt0taC/UhPOUwTHZQTbOEhmNQNaCNBx5O5AINDMWS+6IYqmNrvdfl7YiC/FZxAxQFITlAn515gajcYSgu8jiooMVDDChLzDlkdDc6j8KPLpKBo+eDyeTW6321tbW5tltVon2XdRmIOVDs5ecB6J6cgm8yhGDWu32izo+iHYgd80kg2RYEdkAgAa8O0RNs57uYlZFrsF3+fIfvC2KgC5UPbBnZGMThWEoAnRA5zG2ddFUTMEYIkE13PeQyFrVB8YqU9MTBS9HBAJZgDxMNd5fDCi6rkf9ttsDVG0iIaHCS6BkmFBMX4vML0nYb3qW1dXl0bf3gqqhMMlDk6gXMfpiOok+XyCnhhV/S389ssiDhJ3k1UMXc8iirMgm7FfVhivFXxQTzEUYegk+GyE4xnkeR3ZS2Ub+/r6xqkyVVSJ7QL0XIygthPKOsAahfbSuSkSjebaD8XUoF5kOk4xHQHJ8QD2cglwDrC5aaJHTeLZQL8hdBImk/AKYiPgY+DtgcaP899BZWXlWsbRRVABDkNMyTH6Ms3+hiAt6zPn+fRpWgDq9XqNWgRNLQDwKmYxpiN8lOUul+ur8PvtLaqqqloJSJesQrw1E8g5svrDarWy4lS/318GcCO6SfQe/26v19sK+DeVsgUfOxpfjINIVCQcBZ/0RocYktXeRd4gbyZchrlpS2SjF00gOR6Wr6hIUEYCt7Q7sW9HHmM9RoZq60sVMHqP+VxTaRvB7axBqDHGAljKvugfTkVFRSYJfP39/Z6lgP74Bn8LGDdF/yrBTzNUuzQBSWfcAAAAAElFTkSuQmCC'}, e:{click:a=>{
		a.target.parentElement.children[1].type = a.target.parentElement.children[1].type.toLowerCase() == 'password' ? 'text' : 'password'
		a.target.src = a.target.parentElement.children[1].type.toLowerCase() == 'password' ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADWklEQVRIS82VX0jTURTH/elmGpL5lJr2UEp/QCNHf9SHJkQ2UedkolAEVkhQpA/Wg0baQ/RWRD5EWfRU2WT/xCYktKLSIlKKHqxekswicFBi29yfPtfuT9ZwuiKhweWec+4533Pu95zfnZKwzD9lmfET/u8ENTU1B7Ra7T2LxTIVi4l4b6BUV1dnhcPhDEVRArOzs5MA65OSkhwATwWDQbPT6XywUJKYCQwGw6qUlJR6QM2A7iQ4PRIAexi7iA+GQqFtDofjdVwJdDqdNjc3txXnk8RnqEHgzSCPYlvPnhkBds1mszXFRZHJZNqM4x1WIYCfAMsWgchdPp+vXaPRrIaWDuyHpP071edDzxd5Yzt0taC/UhPOUwTHZQTbOEhmNQNaCNBx5O5AINDMWS+6IYqmNrvdfl7YiC/FZxAxQFITlAn515gajcYSgu8jiooMVDDChLzDlkdDc6j8KPLpKBo+eDyeTW6321tbW5tltVon2XdRmIOVDs5ecB6J6cgm8yhGDWu32izo+iHYgd80kg2RYEdkAgAa8O0RNs57uYlZFrsF3+fIfvC2KgC5UPbBnZGMThWEoAnRA5zG2ddFUTMEYIkE13PeQyFrVB8YqU9MTBS9HBAJZgDxMNd5fDCi6rkf9ttsDVG0iIaHCS6BkmFBMX4vML0nYb3qW1dXl0bf3gqqhMMlDk6gXMfpiOok+XyCnhhV/S389ssiDhJ3k1UMXc8iirMgm7FfVhivFXxQTzEUYegk+GyE4xnkeR3ZS2Ub+/r6xqkyVVSJ7QL0XIygthPKOsAahfbSuSkSjebaD8XUoF5kOk4xHQHJ8QD2cglwDrC5aaJHTeLZQL8hdBImk/AKYiPgY+DtgcaP899BZWXlWsbRRVABDkNMyTH6Ms3+hiAt6zPn+fRpWgDq9XqNWgRNLQDwKmYxpiN8lOUul+ur8PvtLaqqqloJSJesQrw1E8g5svrDarWy4lS/318GcCO6SfQe/26v19sK+DeVsgUfOxpfjINIVCQcBZ/0RocYktXeRd4gbyZchrlpS2SjF00gOR6Wr6hIUEYCt7Q7sW9HHmM9RoZq60sVMHqP+VxTaRvB7axBqDHGAljKvugfTkVFRSYJfP39/Z6lgP74Bn8LGDdF/yrBTzNUuzQBSWfcAAAAAElFTkSuQmCC' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAC+klEQVRIS+WVXUiTYRTHfffRhnSxWVT0gYGRJRRERLAilhXhcpsfrYvwJiIoSoi6KCOQCAUvQkgLoroI6sbZ5jY2iKgkUm+iJMpMCuqmD0znTTn22e+MvfK6NvXGKweH8zzn/M//PM8553mnlCzyT1lk/pIllMDhcKwxGo1l6XRaSaVSE5FI5OdCylu0RE6ns1Sv1zdCckxRFBu6LI9wMpPJDGLrIeHjUCj0t1DC/xLY7XaD1WptBnwZWaUGQSYEw0gFCVdryfD9wtYRjUa7+vv7k1rfrARut7sK4ENkB0ET6BUCZt1Naa6YTKZMIpFoxy4H0P4m5Ybg3iJNgUBgRHXOJKivrz+Es5dgM84W1htYn2d9LxaLnTObzfexHcdWqKyd4L4j7Yjc1OP3+59KkizY5XLto95PIPhDvBPnUF1d3SjrSk68nuaeBHatWFOJ+9TX17eFCth0Ol0IXCl9ORwMBl8qtbW16yB4h1EPYbXP53sjRNxoWqpDsuUkG8S3u1gC7NPgSsXf0NCwi3I+A8/ZEtsVgsNsHPgaAflUEuy/cz34hq18DnJxjRM7MxAczoOth5tFJIGUhQGIbmICYpoEQSnXPMSqO0gCt7qpqakx0bMvJLAqZOvGcRa5A+i0CqKeB6lntlEL+B0g9rnmcLc53Bn2txR5UAaD4TWbrchVgG0a4M0CI5mfr5OYC5qYFmJkmkaTyeTO7BRRpo2oARxrudYNmn7J6/WmsEkJW7G3sF6Wxxxn3wb5dXTG4/HoaWoH2Ivsf8BjY7K+zsw0RBU4IgA24xxizE7x/D8IKZNRjs2DyC0zyEfK18vEyQCUUM5txN2VSQMzxhQdYUQ/i2/WoyGJBVsXwCZ0GrAX/WBqauqFdgAkkE+K2WKx7Ad7gq18s3TIo3g83hwOh6PqbQt+7Gh8NQB5WHtzwAR6jITjuZe8knUla0PO/wrdqm30nAlUp1ydUhyFbA9kVejsF5W1fElH0ANsvRC/V2Py9RL6RytWgvnsi16if+tuTCly7ullAAAAAElFTkSuQmCC'
	}}})
	
	el({a:'div', b:c, c:'Login', d:{style:'background:rgba(255,0,0,0.7); border-radius:3px; border-bottom:1px solid #505050; cursor:pointer; color:rgba(255,255,255,0.9); padding:7px; text-align:center; margin-top:9px'}, e:{click:a=>{
		m.user = document.querySelector('.LoginInput').value.trim()
		document.body.removeChild(a.target.parentElement.parentElement.parentElement)
	}}})
	
},

home: () => {
	el({a:'div', b:document.body, d:{style:'background:#000000; min-height:100vh; width:100vw; margin:0; padding:0 0 0 83px;'}})
	const a = el({a:'div', b:document.body, d:{style:'background:#191919; position:fixed; top:0; left:0; width:71px; height:100vh; display:flex; flex-direction:column; gap:11px; padding:55px 0 0 0; align-items:center;'}})
	
	const click1=(a,b)=>{
		if (a.target.className) {
			(a=>{
				a.style = m.icon.c1
				a.classList.toggle('hover1')
			})([...a.target.parentElement.children].filter(a=>!a.className)[0])
			a.target.style = m.icon.c2
			a.target.classList.toggle('hover1')
			m.showPage(b)
		}
	}
	
	el({a:'img', b:a, d:{src:m.icon.home, style:m.icon.c2}, e:{click:a=>{click1(a,m.page1)}}})
	el({a:'img', b:a, d:{src:m.icon.layer, class:'hover1', style:m.icon.c1}, e:{click:a=>{click1(a,m.page2[0])}}})
	el({a:'img', b:a, d:{src:m.icon.list, class:'hover1', style:m.icon.c1}, e:{click:a=>{click1(a,m.page3)}}})
	el({a:'img', b:a, d:{src:m.icon.calendar, class:'hover1', style:m.icon.c1}, e:{click:a=>{click1(a,m.page4)}}})
},

page1: a => {
	a.innerHTML = ''
	
	a = el({a:'div', b:a, d:{class: 'page1', style:'gap:19px 5px;'}});
	
	(a => {
		el({a:'div', b:a, c:'Total Sites', d:{class: 'subPageTitle'}})
		const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0 2vmin; padding:0; width:calc(23vw - 39px); height:calc(40vh - 93px);'}})})
		el({a:'span', b:el({a:'span', b:el({a:'div', b:a, d:{style:'background:#c0c0c0; border-radius:5px; margin:1vmin 4vmin 2vmin 4vmin; padding:2vmin;'}}), c:'Total Sites:'}).parentElement, c:' 887/3545', d:{style:'color:rgb(207,57,9);'}})
		
		new Chart(b, {
			type: 'pie',
			data: {
				//labels: ['Not clear', 'clear'],
				datasets: [{
					data: [75, 25],
					backgroundColor: [
						'rgb(247,87,9)',
						'rgb(55,189,187)',
					],
				}]
			},
		})
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(25vw - 39px); height:calc(50vh - 53px);'}}));
	
	(a => {
		el({a:'div', b:a, c:'Count Parameter Not Clear', d:{class: 'subPageTitle'}})
		const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0 2vmin; padding:0; width:calc(23vw - 39px); height:calc(47vh - 93px);'}})})
		
		b.width = parseInt(b.parentElement.getBoundingClientRect().width)
		b.height = parseInt(b.parentElement.getBoundingClientRect().height)
		
		new Chart(b, {
			type: 'bubble',
			data: {
				labels: ['TREG1', 'TREG2', 'TREG3', 'TREG4', 'TREG5', 'TREG6', 'TREG7'],
				datasets: [{
					label: '',
					data: [{x:0, y:0, r:0},{x:200, y:200, r:0}],
				},
				{
					label: 'Jitter',
					data: [{x:150, y:50, r:70}],
					backgroundColor: 'rgba(249,179,9,0.7)',
				},
				{
					label: 'Packetloss',
					data: [{x:100, y:150, r:70}],
					backgroundColor: 'rgba(55,189,187,0.7)',
				},
				{
					label: 'Latency',
					data: [{x:50, y:50, r:70}],
					backgroundColor: 'rgb(247,87,9,0.7)',
				},
				]
			},
			options: {
				plugins: {
					legend: {
						display: false,
					}
				}
			}
		})
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(25vw - 39px); height:calc(50vh - 53px);'}}));
	
	(a => {
		el({a:'div', b:a, c:'Site Status in Percentage (%)', d:{class: 'subPageTitle'}})
		const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0 2vmin; padding:0; width:calc(23vw - 39px); height:calc(47vh - 93px);'}})})
		
		b.width = parseInt(b.parentElement.getBoundingClientRect().width)
		b.height = parseInt(b.parentElement.getBoundingClientRect().height)
		
		new Chart(b, {
			type: 'bar',
			data: {
				labels: ['TREG1', 'TREG2', 'TREG3', 'TREG4', 'TREG5', 'TREG6', 'TREG7'],
				datasets: [{
					label: 'Clear',
					data: [400, 800, 600, 900, 400, 200, 600],
					backgroundColor: 'rgb(55,189,187)',
					borderRadius: Number.MAX_VALUE
				},
				{
					label: 'Not clear',
					data: [200, 600, 400, 600, 200, 100, 400],
					backgroundColor: 'rgb(247,87,9)',
					borderRadius: Number.MAX_VALUE
				}]
			},
			options: {
				plugins: {
					legend: {
						position: 'bottom',
					}
				}
			}
		})
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(25vw - 39px); height:calc(50vh - 53px);'}}));
	
	(a => {
		el({a:'div', b:a, c:'Detail City Unclear', d:{class: 'subPageTitle'}})
		const b = el({a:'table', b:a})
		
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:el({a:'TR', b:b}), c:'No'}).parentElement,
		c:'Kota'}).parentElement,
		c:'Treg'}).parentElement,
		c:'Consecutive Week'})
		
		for (var i=1; i<11; i++) {
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:el({a:'TR', b:b}), c:i}).parentElement
			}).parentElement
			}).parentElement
			})
		}
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(25vw - 39px); height:calc(50vh - 53px);'}}));
	
	//===
	
	(a => {
		el({a:'div', b:a, c:'Summary', d:{class: 'subPageTitle'}})
		const b = el({a:'table', b:a})
		
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:el({a:'TR', b:b}), c:'Treg'}).parentElement,
		c:'Site Clear'}).parentElement,
		c:'Site Not Clear'}).parentElement,
		c:'Capacity'}).parentElement,
		c:'Tsel'}).parentElement,
		c:'Gangguan'}).parentElement,
		c:'Unspec Quality'}).parentElement,
		c:'ISR'})
		
		for (var i=1; i<8; i++) {
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:el({a:'TR', b:b}), c:`Treg${i}`}).parentElement
			}).parentElement
			}).parentElement
			}).parentElement
			}).parentElement
			}).parentElement
			}).parentElement
			})
		}
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:el({a:'TR', b:b}), c:'National'}).parentElement
		}).parentElement
		}).parentElement
		}).parentElement
		}).parentElement
		}).parentElement
		}).parentElement
		})
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(41vw - 39px); height:calc(50vh - 49px);'}}));
	
	(a => {
		el({a:'div', b:a, c:'Trend Not Clear', d:{class: 'subPageTitle'}})
		const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0 2vmin; padding:0; width:calc(27vw - 39px); height:calc(47vh - 89px);'}})})
		
		b.width = parseInt(b.parentElement.getBoundingClientRect().width)
		b.height = parseInt(b.parentElement.getBoundingClientRect().height)
		
		new Chart(b, {
			type: 'line',
			data: {
				labels: ['Jan', 'Feb', 'Mar'],
				datasets: [{
					label: 'Treg1',
					data: [25, 23, 23],
					fill: false,
					backgroundColor: 'white',
					borderColor: 'white',
				},
				{
					label: 'Treg2',
					data: [21, 19, 19],
					fill: false,
					backgroundColor: 'rgb(99, 132, 255)',
					borderColor: 'rgb(99, 132, 255)',
				},
				{
					label: 'Treg3',
					data: [17, 15, 15],
					fill: false,
					backgroundColor: 'rgb(255, 255, 99)',
					borderColor: 'rgb(255, 255, 99)',
				},
				{
					label: 'Treg4',
					data: [13, 11, 11],
					fill: false,
					backgroundColor: 'rgb(99, 255, 99)',
					borderColor: 'rgb(99, 255, 99)',
				},
				{
					label: 'Treg5',
					data: [9, 7, 7],
					fill: false,
					backgroundColor: 'rgb(255, 99, 99)',
					borderColor: 'rgb(255, 99, 99)',
				},
				{
					label: 'Treg6',
					data: [5, 3, 3],
					fill: false,
					backgroundColor: 'rgb(99, 99, 255)',
					borderColor: 'rgb(99, 99, 255)',
				},
				{
					label: 'Treg7',
					data: [3, 1, 1],
					fill: false,
					backgroundColor: 'rgb(132, 99, 255)',
					borderColor: 'rgb(132, 99, 255)',
				},
				]
			},
			options: {
				plugins: {
					legend: {
						position: 'bottom',
						labels: {
							usePointStyle: true,
						},
					},
				}
			}
		})
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(29vw - 39px); height:calc(50vh - 49px);'}}));
	
	(a => {
		el({a:'div', b:a, c:'Monthly RCA', d:{class: 'subPageTitle'}})
		const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0 2vmin; padding:0; width:calc(27vw - 39px); height:calc(47vh - 89px);'}})})
		
		b.width = parseInt(b.parentElement.getBoundingClientRect().width)
		b.height = parseInt(b.parentElement.getBoundingClientRect().height)
		
		new Chart(b, {
			type: 'line',
			data: {
				labels: ['Jan', 'Feb', 'Mar'],
				datasets: [{
					label: 'Capacity',
					data: [25, 23, 23],
					fill: true,
					backgroundColor: 'white',
					borderColor: 'white',
				},
				{
					label: 'ISR',
					data: [21, 19, 19],
					fill: true,
					backgroundColor: 'rgb(99, 132, 255)',
					borderColor: 'rgb(99, 132, 255)',
				},
				{
					label: 'Unspec Quality',
					data: [17, 15, 15],
					fill: true,
					backgroundColor: 'rgb(255, 255, 99)',
					borderColor: 'rgb(255, 255, 99)',
				},
				{
					label: 'Gangguan',
					data: [13, 11, 11],
					fill: true,
					backgroundColor: 'rgb(99, 255, 99)',
					borderColor: 'rgb(99, 255, 99)',
				},
				{
					label: 'Tsel',
					data: [9, 7, 7],
					fill: true,
					backgroundColor: 'rgb(255, 99, 99)',
					borderColor: 'rgb(255, 99, 99)',
				}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'bottom',
						labels: {
							usePointStyle: true,
						},
					},
					tooltip: {
						mode: 'index'
					},
				},
				interaction: {
					mode: 'nearest',
					axis: 'x',
					intersect: false
				},
				scales: {
					x: {
						title: {
							display: true,
							text: 'Month'
						}
					},
					y: {
						stacked: true,
						title: {
							display: true,
							text: 'Value'
						}
					}
				}
			}
		})
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(29vw - 39px); height:calc(50vh - 49px);'}}));
	
	m.page1 = a
},

page2: a => {
	a.innerHTML = ''
	
	a = el({a:'div', b:el({a:'div', b:a}), d:{class: 'page1'}})
	el({a:'div', b:a, c:'Liga Ticket', d:{class: 'pageTitle'}});
	
	(a=>{
		el({a:'div', b:a, c:'AVG Ticket Monthly'})
		el({a:'div', b:a, c:'117'})
	})(el({a:'div', b:a, d:{class:'subPage1', style:'border:2px solid rgb(247,87,9); color:rgb(247,87,9); width:calc(25vw - 39px); height:87px; display:flex; flex-direction:column; gap:5px; align-items:center; justify-content:center;'}}));
	
	(a=>{
		el({a:'div', b:a, c:'AVG MTTR Monthly'})
		el({a:'div', b:a, c:'959'})
	})(el({a:'div', b:a, d:{class:'subPage1', style:'border:2px solid rgb(55,189,187); color:rgb(55,189,187); width:calc(25vw - 39px); height:87px; display:flex; flex-direction:column; gap:5px; align-items:center; justify-content:center;'}}));
	
	(a=>{
		el({a:'div', b:a, c:'Ticket > 48 Hours'})
		el({a:'div', b:a, c:'33.7%'})
	})(el({a:'div', b:a, d:{class:'subPage1', style:'border:2px solid rgb(249,179,9); color:rgb(249,179,9); width:calc(25vw - 39px); height:87px; display:flex; flex-direction:column; gap:5px; align-items:center; justify-content:center;'}}));
	
	(a=>{
		el({a:'div', b:a, c:'% Resolved with SLA'})
		el({a:'div', b:a, c:'84%'})
	})(el({a:'div', b:a, d:{class:'subPage1', style:'border:2px solid rgb(111,79,181); color:rgb(111,79,181); width:calc(25vw - 39px); height:87px; display:flex; flex-direction:column; gap:5px; align-items:center; justify-content:center;'}}));
	
	//===
	
	(a => {
		el({a:'div', b:a, c:'Quality', d:{class: 'subPageTitle'}})
		const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0 2vmin; padding:0; width:calc(33vw - 39px); height:calc(47vh - 139px);'}})})
		
		b.width = parseInt(b.parentElement.getBoundingClientRect().width)
		b.height = parseInt(b.parentElement.getBoundingClientRect().height)
		
		new Chart(b, {
			type: 'bar',
			data: {
				labels: ['','', 'Garansi', 'Non garansi'],
				datasets: [{
					label: 'Ticket Done',
					data: [0, 0, 27, 33],
					backgroundColor: 'rgb(55,189,187)',
				},
				{
					label: 'On Assessment',
					data: [0, 0, 0, 18],
					backgroundColor: 'rgb(247,87,9)',
				}]
			},
			options: {
				indexAxis: 'y',
				responsive: true,
				scales: {
					x: { stacked: true, },
					y: { stacked: true }
				},
				plugins: {
					legend: { position: 'bottom', },
				}
			},
		})
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(35vw - 39px); height:calc(50vh - 119px);'}}));
	
	(a => {
		el({a:'div', b:a, c:'Ticket', d:{class: 'subPageTitle'}})
		const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0 2vmin; padding:0; width:calc(13vw - 39px); height:calc(47vh - 139px);'}})})
		
		b.width = parseInt(b.parentElement.getBoundingClientRect().width)
		b.height = parseInt(b.parentElement.getBoundingClientRect().height)
		
		new Chart(b, {
			type: 'bar',
			data: {
				labels: ['1'],
				datasets: [{
					label: 'Open',
					data: [37],
					backgroundColor: 'rgb(75,159,245)',
				},
				{
					label: 'Closed',
					data: [50],
					backgroundColor: 'rgb(247,87,9)',
				},
				{
					label: 'Pending',
					data: [13],
					backgroundColor: 'rgb(185,187,199)',
				}]
			},
			options: {
				categoryPercentage: 0.7,
				elements: {
					bar: { borderWidth: 1, borderColor: 'rgba(0,0,0,0)' }
				},
				responsive: true,
				scales: {
					x: { stacked: true, },
					y: { stacked: true }
				},
				plugins: {
					legend: { position: 'bottom', },
				}
			},
		})
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(15vw - 39px); height:calc(50vh - 119px);'}}));
	
	(a => {
		el({a:'div', b:a, c:'Status Ticket Quality', d:{class: 'subPageTitle'}})
		const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0 2vmin; padding:0; width:calc(23vw - 39px); height:calc(47vh - 139px);'}})})
		
		b.width = parseInt(b.parentElement.getBoundingClientRect().width)
		b.height = parseInt(b.parentElement.getBoundingClientRect().height)
		
		new Chart(b, {
			type: 'bar',
			data: {
				labels: ['TREG1', 'TREG2', 'TREG3', 'TREG4', 'TREG5', 'TREG6', 'TREG7'],
				datasets: [{
					label: 'Open',
					data: [100, 400, 200, 200, 150, 70, 150],
					backgroundColor: 'rgb(75,159,245)',
				},
				{
					label: 'Closed',
					data: [100, 200, 200, 100, 100, 200, 200],
					backgroundColor: 'rgb(247,87,9)',
				},
				{
					label: 'Pending',
					data: [100, 100, 50, 200, 30, 30, 150],
					backgroundColor: 'rgb(185,187,199)',
				}]
			},
			options: {
				categoryPercentage: 0.4,
				elements: {
					bar: { borderRadius: Number.MAX_VALUE, }
				},
				responsive: true,
				scales: {
					x: { stacked: true },
					y: { stacked: true },
				},
				plugins: {
					legend: { position: 'bottom', },
				}
			},
		})
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(25vw - 39px); height:calc(50vh - 119px);'}}));
	
	(a => {
		el({a:'div', b:a, c:'Open Ticket > 48 Hours', d:{class: 'subPageTitle'}})
		const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0 2vmin; padding:0; width:calc(23vw - 39px); height:calc(47vh - 139px);'}})})
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(25vw - 39px); height:calc(50vh - 119px);'}}));
	
	//===
	
	(a => {
		el({a:'div', b:a, c:'Count Ticket Closed', d:{class: 'subPageTitle'}})
		const b = el({a:'table', b:a})
		
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:el({a:'TR', b:b}), c:'Treg'}).parentElement,
		c:'Close'}).parentElement,
		c:'Open'}).parentElement,
		c:'Progress'})
		
		for (var i=1; i<8; i++) {
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:el({a:'TR', b:b}), c:`Treg${i}`}).parentElement
			}).parentElement
			}).parentElement
			})
		}
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:el({a:'TR', b:b}), c:'Total'}).parentElement
		}).parentElement
		}).parentElement
		})
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(25vw - 39px); height:calc(50vh - 119px);'}}));
	
	(a => {
		el({a:'div', b:a, c:'MTTR Ticket by PIC', d:{class: 'subPageTitle'}})
		el({a:'div', b:a, c:'Group Jumlah Ticket TTR (hour)', d:{style:'margin:1vmin 4vmin; color:white;'}})
		
		a = el({a:'table', b:a, d:{class:'table1', style:'border:none;'}})
		
		el({a:'td', c:'10', b:
		el({a:'td', c:'45', b:
		el({a:'td', c:'DSO', b:
		el({a:'td', c:'=', b:el({a:'TR', b:a, d:{class:'trBold'}}), d:{style:'border:none;'}}).parentElement,
		d:{style:'border:none;'}}).parentElement,
		d:{style:'border:none;'}}).parentElement,
		d:{style:'border:none;'}})
		
		el({a:'td', c:'10', b:
		el({a:'td', c:'22', b:
		el({a:'td', c:'CNQ', b:
		el({a:'td', c:'', b:el({a:'TR', b:a}), d:{style:'border:none;'} }).parentElement,
		d:{style:'border:none;'} }).parentElement,
		d:{style:'border:none;'} }).parentElement,
		d:{style:'border:none;'} })
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(25vw - 39px); height:calc(50vh - 119px);'}}));
	
	(a => {
		el({a:'div', b:a, c:'MTTR Ticket by PIC', d:{class: 'subPageTitle'}})
		const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0 2vmin; padding:0; width:calc(23vw - 39px); height:calc(47vh - 139px);'}})})
		
		b.width = parseInt(b.parentElement.getBoundingClientRect().width)
		b.height = parseInt(b.parentElement.getBoundingClientRect().height)
		
		new Chart(b, {
			type: 'bar',
			data: {
				labels: ['DSO','MSO', 'WITEL', 'SQUAT'],
				datasets: [{
					label: 'Hour',
					data: [33, 41, 27, 42],
					backgroundColor: 'rgb(247,87,9)',
				}]
			},
			options: {
				categoryPercentage: 0.5,
				indexAxis: 'y',
				responsive: true,
				plugins: {
					legend: { position: 'bottom', },
				}
			},
		})
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(25vw - 39px); height:calc(50vh - 119px);'}}));
	
	(a => {
		el({a:'div', b:a, c:'MTTR Ticket by PIC', d:{class: 'subPageTitle'}})
		const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0 2vmin; padding:0; width:calc(23vw - 39px); height:calc(47vh - 139px);'}})})
		
		b.width = parseInt(b.parentElement.getBoundingClientRect().width)
		b.height = parseInt(b.parentElement.getBoundingClientRect().height)
		
		new Chart(b, {
			type: 'bar',
			data: {
				labels: ['TREG 6','TREG 2', 'TREG 4', 'TREG 7', 'TREG 1', 'TREG 3', 'TREG 5'],
				datasets: [{
					label: 'MTTR',
					data: [50, 41, 37, 33, 29, 28, 19],
					backgroundColor: 'rgb(55,189,187)',
				}]
			},
			options: {
				categoryPercentage: 0.7,
				elements: {
					bar: { borderRadius: Number.MAX_VALUE, }
				},
				indexAxis: 'y',
				responsive: true,
				plugins: {
					legend: { position: 'bottom', },
				}
			},
		})
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(25vw - 39px); height:calc(50vh - 119px);'}}));
	
	//===
	a = el({a:'div', b:a.parentElement, d:{class: 'page1'}})
	el({a:'div', b:a, c:'Non Liga Ticket', d:{class: 'pageTitle'}})
	
	const b = el({a:'label', b:el({a:'div', b:a, d:{style:'width:calc(100vw - 39px);'}}), d:{style:'position:relative; display:inline-block; width:160px; height:34px;'}})
	el({a:'input', b:b, d:{type:'checkbox'}, e:{change:a=>{
		const b = m.page2[0].children[1]
		while (b.children.length > 2) b.removeChild(b.children[2]);
		(a.target.checked ? m.page2[1].slice(4) : m.page2[1].slice(0, 4)).forEach(a=>{b.appendChild(a)})
	}}})
	el({a:'div', b:el({a:'div', b:el({a:'div', b:b, d:{class:'slider1'}}), c:'Graph'}).parentElement, c:'Table'})
	
	const c = [
		(a => {
			el({a:'div', b:a, c:'Total Capacity', d:{class: 'subPageTitle'}})
			const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0 2vmin; padding:0; width:calc(48vw - 71px); height:calc(47vh - 109px);'}})})
			
			b.width = parseInt(b.parentElement.getBoundingClientRect().width)
			b.height = parseInt(b.parentElement.getBoundingClientRect().height)
			
			new Chart(b, {
				type: 'bar',
				data: {
					labels: ['TREG 6','TREG 2', 'TREG 4', 'TREG 7', 'TREG 1', 'TREG 3', 'TREG 5'],
					datasets: [{
						label: 'MTTR',
						data: [50, 41, 37, 33, 29, 28, 19],
						backgroundColor: 'rgb(54, 162, 235)',
					}]
				},
				options: {
					categoryPercentage: 0.7,
					elements: {
						bar: { borderRadius: Number.MAX_VALUE, }
					},
					indexAxis: 'y',
					responsive: true,
					plugins: {
						legend: { position: 'bottom', },
					}
				},
			})
			
			return a
		})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(50vw - 71px); height:calc(50vh - 89px);'}})),
		
		(a => {
			el({a:'div', b:a, c:'Total Tsel', d:{class: 'subPageTitle'}})
			const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0 2vmin; padding:0; width:calc(48vw - 71px); height:calc(47vh - 109px);'}})})
			
			b.width = parseInt(b.parentElement.getBoundingClientRect().width)
			b.height = parseInt(b.parentElement.getBoundingClientRect().height)
			
			new Chart(b, {
				type: 'bar',
				data: {
					labels: ['TREG 6','TREG 2', 'TREG 4', 'TREG 7', 'TREG 1', 'TREG 3', 'TREG 5'],
					datasets: [{
						label: 'MTTR',
						data: [50, 41, 37, 33, 29, 28, 19],
						backgroundColor: 'rgb(54, 162, 235)',
					}]
				},
				options: {
					categoryPercentage: 0.7,
					elements: {
						bar: { borderRadius: Number.MAX_VALUE, }
					},
					indexAxis: 'y',
					responsive: true,
					plugins: {
						legend: { position: 'bottom', },
					}
				},
			})
			
			return a
		})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(50vw - 71px); height:calc(50vh - 89px);'}})),
		
		(a => {
			el({a:'div', b:a, c:'Total Gangguan', d:{class: 'subPageTitle'}})
			const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0 2vmin; padding:0; width:calc(48vw - 71px); height:calc(47vh - 109px);'}})})
			
			b.width = parseInt(b.parentElement.getBoundingClientRect().width)
			b.height = parseInt(b.parentElement.getBoundingClientRect().height)
			
			new Chart(b, {
				type: 'bar',
				data: {
					labels: ['TREG 6','TREG 2', 'TREG 4', 'TREG 7', 'TREG 1', 'TREG 3', 'TREG 5'],
					datasets: [{
						label: 'MTTR',
						data: [50, 41, 37, 33, 29, 28, 19],
						backgroundColor: 'rgb(54, 162, 235)',
					}]
				},
				options: {
					categoryPercentage: 0.7,
					elements: {
						bar: { borderRadius: Number.MAX_VALUE, }
					},
					indexAxis: 'y',
					responsive: true,
					plugins: {
						legend: { position: 'bottom', },
					}
				},
			})
			
			return a
		})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(50vw - 71px); height:calc(50vh - 89px);'}})),
		
		(a => {
			el({a:'div', b:a, c:'Total Unspect', d:{class: 'subPageTitle'}})
			const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0 2vmin; padding:0; width:calc(48vw - 71px); height:calc(47vh - 109px);'}})})
			
			b.width = parseInt(b.parentElement.getBoundingClientRect().width)
			b.height = parseInt(b.parentElement.getBoundingClientRect().height)
			
			new Chart(b, {
				type: 'bar',
				data: {
					labels: ['TREG 6','TREG 2', 'TREG 4', 'TREG 7', 'TREG 1', 'TREG 3', 'TREG 5'],
					datasets: [{
						label: 'MTTR',
						data: [50, 41, 37, 33, 29, 28, 19],
						backgroundColor: 'rgb(54, 162, 235)',
					}]
				},
				options: {
					categoryPercentage: 0.7,
					elements: {
						bar: { borderRadius: Number.MAX_VALUE, }
					},
					indexAxis: 'y',
					responsive: true,
					plugins: {
						legend: { position: 'bottom', },
					}
				},
			})
			
			return a
		})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(50vw - 71px); height:calc(50vh - 89px);'}})),
		
		//===
		
		(a => {
			el({a:'div', b:a, c:'Capacity', d:{class: 'subPageTitle'}})
			const b = el({a:'table', b:a})
			
			el({a:'th', b:
			el({a:'th', b:
			el({a:'th', b:
			el({a:'th', b:
			el({a:'th', b:
			el({a:'th', b:el({a:'TR', b:b}), c:'Treg'}).parentElement,
			c:'Metro'}).parentElement,
			c:'OLT'}).parentElement,
			c:'ONT'}).parentElement,
			c:'Radio'}).parentElement,
			c:'Comcase'})
			
			for (var i=1; i<8; i++) {
				el({a:'td', b:
				el({a:'td', b:
				el({a:'td', b:
				el({a:'td', b:
				el({a:'td', b:
				el({a:'td', b:el({a:'TR', b:b}), c:`Treg${i}`}).parentElement
				}).parentElement
				}).parentElement
				}).parentElement
				}).parentElement
				})
			}
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:el({a:'TR', b:b}), c:'Total'}).parentElement
			}).parentElement
			}).parentElement
			}).parentElement
			}).parentElement
			})
			
			return a
		})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(60vw - 69px); height:calc(50vh - 89px);'}})),
		
		(a => {
			el({a:'div', b:a, c:'SOW Tsel', d:{class: 'subPageTitle'}})
			const b = el({a:'table', b:a})
			
			el({a:'th', b:
			el({a:'th', b:
			el({a:'th', b:
			el({a:'th', b:el({a:'TR', b:b}), c:'Treg'}).parentElement,
			c:'Suhu'}).parentElement,
			c:'Power'}).parentElement,
			c:'Site tsel'})
			
			for (var i=1; i<8; i++) {
				el({a:'td', b:
				el({a:'td', b:
				el({a:'td', b:
				el({a:'td', b:el({a:'TR', b:b}), c:`Treg${i}`}).parentElement
				}).parentElement
				}).parentElement
				})
			}
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:el({a:'TR', b:b}), c:'Total'}).parentElement
			}).parentElement
			}).parentElement
			})
			
			return a
		})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(40vw - 69px); height:calc(50vh - 89px);'}})),
		
		(a => {
			el({a:'div', b:a, c:'Gangguan', d:{class: 'subPageTitle'}})
			const b = el({a:'table', b:a})
			
			el({a:'th', b:
			el({a:'th', b:
			el({a:'th', b:el({a:'TR', b:b}), c:'Treg'}).parentElement,
			c:'TBB'}).parentElement,
			c:'IPBB'})
			
			for (var i=1; i<8; i++) {
				el({a:'td', b:
				el({a:'td', b:
				el({a:'td', b:el({a:'TR', b:b}), c:`Treg${i}`}).parentElement
				}).parentElement
				})
			}
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:el({a:'TR', b:b}), c:'Total'}).parentElement
			}).parentElement
			})
			
			return a
		})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(40vw - 49px); height:calc(50vh - 89px);'}})),
		
		(a => {
			el({a:'div', b:a, c:'Unspect', d:{class: 'subPageTitle'}})
			const b = el({a:'table', b:a})
			
			el({a:'th', b:
			el({a:'th', b:
			el({a:'th', b:el({a:'TR', b:b}), c:'Treg'}).parentElement,
			c:'Done Ticket'}).parentElement,
			c:'Assessment'})
			
			for (var i=1; i<8; i++) {
				el({a:'td', b:
				el({a:'td', b:
				el({a:'td', b:el({a:'TR', b:b}), c:`Treg${i}`}).parentElement
				}).parentElement
				})
			}
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:el({a:'TR', b:b}), c:'Total'}).parentElement
			}).parentElement
			})
			
			return a
		})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(40vw - 49px); height:calc(50vh - 89px);'}})),
		
		(a => {
			el({a:'div', b:a, c:'ISR', d:{class: 'subPageTitle'}})
			const b = el({a:'table', b:a})
			
			el({a:'th', b:
			el({a:'th', b:el({a:'TR', b:b}), c:'Treg'}).parentElement,
			c:'ISR'})
			
			for (var i=1; i<8; i++) {
				el({a:'td', b:
				el({a:'td', b:el({a:'TR', b:b}), c:`Treg${i}`}).parentElement
				})
			}
			el({a:'td', b:
			el({a:'td', b:el({a:'TR', b:b}), c:'Total'}).parentElement
			})
			
			return a
		})(el({a:'div', b:a, d:{class:'subPage1', style:'width:calc(20vw - 49px); height:calc(50vh - 89px);'}})),
		
	];
	
	[...a.children].slice(6).forEach(b=>{a.removeChild(b)})
	
	m.page2 = [a.parentElement, c]
},

page3: a => {
	a.innerHTML = ''
	
	a = el({a:'div', b:a, d:{class: 'page1'}})
	el({a:'div', b:a, c:'Reporting', d:{class: 'pageTitle'}});
	
	(a => {
		el({a:'div', b:a, c:'Detail Issue Per City', d:{class: 'subPageTitle'}})
		const b = el({a:'table', b:a})
		
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:el({a:'TR', b:b}), c:'No'}).parentElement,
		c:'Treg'}).parentElement,
		c:'Kota'}).parentElement,
		c:'Capacity'}).parentElement,
		c:'Tsel'}).parentElement,
		c:'Gangguan'}).parentElement,
		c:'Unspec Quality'}).parentElement,
		c:'ISR'})
		
		for (var i=1; i<8; i++) {
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:el({a:'TR', b:b})}).parentElement,
			c:`Treg${i}`}).parentElement
			}).parentElement
			}).parentElement
			}).parentElement
			}).parentElement
			}).parentElement
			})
		}
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:el({a:'TR', b:b}), c:'-'}).parentElement
		}).parentElement
		}).parentElement
		}).parentElement
		}).parentElement
		}).parentElement
		}).parentElement
		})
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'color:white; width:calc(100vw - 39px); height:calc(50vh - 99px);'}}));
	
	(a => {
		el({a:'div', b:a, c:'10 Ticket Open Terlama', d:{class: 'subPageTitle', style:'background:rgb(55,189,187); padding:1.5vmin; text-align:center;'}})
		
		const b = el({a:'div', b:a, d:{style:'color:white; display:grid; grid-template-columns:repeat(5,auto); padding:9px;'}})
		
		el({a:'div', b:b, c:'NO'})
		el({a:'div', b:b, c:'TICKET ID'})
		el({a:'div', b:b, c:'TREG'})
		el({a:'div', b:b, c:'WITEL'})
		el({a:'div', b:b, c:'TTR'})
		
		for (var i=1; i<11; i++) {
			el({a:'div', b:b, c:`${i}.`})
			el({a:'div', b:b, c:'IN24546464'})
			el({a:'div', b:b, c:'TREG3'})
			el({a:'div', b:b, c:'BANDUNG'})
			el({a:'div', b:b, c:'10'})
		}
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'border:1px solid rgb(55,189,187); width:calc(33vw - 49px); height:calc(50vh - 25px); overflow:hidden;'}}));
	
	(a => {
		el({a:'div', b:a, c:'RCA', d:{class: 'subPageTitle', style:'background:rgb(247,87,9); padding:1.5vmin; text-align:center;'}})
		
		el({a:'div', b:a, c:'Radio', d:{style:'padding:3vmin 0 0 4vmin; color:white; font-weight:bold;'}})
		const b = el({a:'table', b:a})
		
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:el({a:'TR', b:b}), c:'No'}).parentElement,
		c:'RCA'}).parentElement,
		c:'Jumlah'})
		
		for (var i=1; i<4; i++) {
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:el({a:'TR', b:b}), c:'.'}).parentElement,
			}).parentElement
			})
		}
		
		el({a:'div', b:a, c:'FO', d:{style:'padding:3vmin 0 0 4vmin; color:white; font-weight:bold;'}})
		const c = el({a:'table', b:a})
		
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:el({a:'TR', b:c}), c:'No'}).parentElement,
		c:'RCA'}).parentElement,
		c:'Jumlah'})
		
		for (var i=1; i<4; i++) {
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:el({a:'TR', b:c}), c:'.'}).parentElement,
			}).parentElement
			})
		}
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'border:1px solid rgb(247,87,9); width:calc(33vw - 49px); height:calc(50vh - 25px); overflow:hidden;'}}));
	
	(a => {
		el({a:'div', b:a, c:'FRO', d:{class: 'subPageTitle', style:'background:rgb(249,179,9); padding:1.5vmin; text-align:center;'}})
		
		el({a:'div', b:a, c:'Radio', d:{style:'padding:3vmin 0 0 4vmin; color:white; font-weight:bold;'}})
		const b = el({a:'table', b:a})
		
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:el({a:'TR', b:b}), c:'No'}).parentElement,
		c:'RFO'}).parentElement,
		c:'Jumlah'})
		
		for (var i=1; i<4; i++) {
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:el({a:'TR', b:b}), c:'.'}).parentElement,
			}).parentElement
			})
		}
		
		el({a:'div', b:a, c:'FO', d:{style:'padding:3vmin 0 0 4vmin; color:white; font-weight:bold;'}})
		const c = el({a:'table', b:a})
		
		el({a:'th', b:
		el({a:'th', b:
		el({a:'th', b:el({a:'TR', b:c}), c:'No'}).parentElement,
		c:'RFO'}).parentElement,
		c:'Jumlah'})
		
		for (var i=1; i<4; i++) {
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:el({a:'TR', b:c}), c:'.'}).parentElement,
			}).parentElement
			})
		}
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'border:1px solid rgb(249,179,9); width:calc(33vw - 49px); height:calc(50vh - 25px); overflow:hidden;'}}));
	
	m.page3 = a
},

page4: a => {
	a.innerHTML = ''
	a = el({a:'div', b:a})//el({a:'div', b:el({a:'div', b:a}), d:{class: 'page1'}})
	
	m.logbookFlag(a)
	m.logbookTicketQuality(a)
	
	m.page4 = a
	
},

logbookFlag: a=>{
	a = el({a:'div', b:a, d:{class: 'page1'}})
	
	el({a:'div', b:a, c:'LOGBOOK FLAG', d:{class: 'pageTitle'}});
	
	(a => {
		const b = el({a:'TR', b:el({a:'table', b:a, d:{id:'logbookFlag'}})})
		
		el({a:'span', b:el({a:'th', b:b, d:{style:'background:rgb(55,189,187); color:white;'}}), c:'No'});
		['Target', 'Sitemap', 'Transport', 'Treg', 'Witel', 'Capacity', 'ISR', 'Gangguan', 'Tsel', 'Unspeck Quality', 'Detail Flag', 'SOW'].forEach(a=>{
			el({a:'img', b: el({a:'span', b:el({a:'th', b:b, d:{style:'background:rgb(55,189,187); color:white;'}}), c:a}).parentElement, d:{src:m.icon.filter, style:'float:right; height:17px; filter:invert(99%) sepia(26%) saturate(6%) hue-rotate(201deg) brightness(109%) contrast(96%);'}})
		})
		
		for (var i=1; i<8; i++) {
			el({a:'img', b:el({a:'span', b:el({a:'td', b:
			el({a:'td', b:
			el({a:'img', b:el({a:'span', b:el({a:'td', b:
			el({a:'img', b:el({a:'span', b:el({a:'td', b:
			el({a:'img', b:el({a:'span', b:el({a:'td', b:
			el({a:'img', b:el({a:'span', b:el({a:'td', b:
			el({a:'img', b:el({a:'span', b:el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:el({a:'TR', b:b.parentElement})}).parentElement,
			c:`Treg${i}`}).parentElement
			}).parentElement
			}).parentElement
			}).parentElement
			}).parentElement
			})}).parentElement, d:{src:m.icon.down, class:'tabelDown'}, e:{click:m.tabelPopup1}}).parentElement.parentElement
			})}).parentElement, d:{src:m.icon.down, class:'tabelDown'}, e:{click:m.tabelPopup1}}).parentElement.parentElement
			})}).parentElement, d:{src:m.icon.down, class:'tabelDown'}, e:{click:m.tabelPopup1}}).parentElement.parentElement
			})}).parentElement, d:{src:m.icon.down, class:'tabelDown'}, e:{click:m.tabelPopup1}}).parentElement.parentElement
			})}).parentElement, d:{src:m.icon.down, class:'tabelDown'}, e:{click:m.tabelPopup1}}).parentElement.parentElement
			}).parentElement
			})}).parentElement, d:{src:m.icon.down, class:'tabelDown'}, e:{click:m.tabelPopup1}})
		}
		
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:el({a:'TR', b:b.parentElement}), c:'-'}).parentElement
		}).parentElement
		}).parentElement
		}).parentElement
		}).parentElement
		}).parentElement, e:{click:m.tabelPopup1}
		}).parentElement, e:{click:m.tabelPopup1}
		}).parentElement, e:{click:m.tabelPopup1}
		}).parentElement, e:{click:m.tabelPopup1}
		}).parentElement, e:{click:m.tabelPopup1}
		}).parentElement
		}).parentElement, e:{click:m.tabelPopup1}
		})
		
	})(el({a:'div', b:a, d:{class:'subPage1', style:'color:white; width:calc(100vw - 39px); height:calc(100vh - 115px);'}}));
},

logbookTicketQuality: a=>{
	a = el({a:'div', b:a, d:{class: 'page1'}})
	
	el({a:'div', b:a, c:'LOGBOOK TICKET QUALITY', d:{class: 'pageTitle'}});
	
	(a => {
		const b = el({a:'TR', b:el({a:'table', b:a, d:{id:'logbookTicketQuality'}})})
		
		el({a:'span', b:el({a:'th', b:b, d:{style:'background:rgb(55,189,187); color:white;'}}), c:'NO'});
		['Report Date', 'No Ticket', 'Detail Ticket', 'Target', 'Transport', 'Treg', 'Witel', 'Status Ticket', 'RCA', 'Update Treg', 'Detail Treg', 'Update Witel', 'deatil Witel', 'TTR', 'Last Update'].forEach(a=>{
			el({a:'img', b: el({a:'span', b:el({a:'th', b:b, d:{style:'background:rgb(55,189,187); color:white;'}}), c:a}).parentElement, d:{src:m.icon.filter, style:'float:right; height:17px; filter:invert(99%) sepia(26%) saturate(6%) hue-rotate(201deg) brightness(109%) contrast(96%);'}})
		})
		
		for (var i=1; i<8; i++) {
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'img', b:el({a:'span', b:el({a:'td', b:
			el({a:'td', b:
			el({a:'img', b:el({a:'span', b:el({a:'td', b:
			el({a:'img', b:el({a:'span', b:el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:
			el({a:'td', b:el({a:'TR', b:b.parentElement})}).parentElement,
			}).parentElement
			}).parentElement
			}).parentElement
			}).parentElement
			}).parentElement
			}).parentElement
			}).parentElement
			}).parentElement
			})}).parentElement, d:{src:m.icon.down, class:'tabelDown'}, e:{click:m.popupLogbookTicketQuality}}).parentElement.parentElement
			})}).parentElement, d:{src:m.icon.down, class:'tabelDown'}, e:{click:m.popupLogbookTicketQuality}}).parentElement.parentElement
			}).parentElement
			})}).parentElement, d:{src:m.icon.down, class:'tabelDown'}, e:{click:m.popupLogbookTicketQuality}}).parentElement.parentElement
			}).parentElement
			}).parentElement
			})
		}
		/*
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:
		el({a:'td', b:el({a:'TR', b:b.parentElement}), c:'-'}).parentElement
		}).parentElement
		}).parentElement
		}).parentElement
		}).parentElement
		}).parentElement, e:{click:m.tabelPopup1}
		}).parentElement, e:{click:m.tabelPopup1}
		}).parentElement, e:{click:m.tabelPopup1}
		}).parentElement, e:{click:m.tabelPopup1}
		}).parentElement, e:{click:m.tabelPopup1}
		}).parentElement
		}).parentElement, e:{click:m.tabelPopup1}
		})
		*/
	})(el({a:'div', b:a, d:{class:'subPage1', style:'color:white; width:calc(100vw - 39px); height:calc(100vh - 115px);'}}));
},

showPage: a => {
	document.body.children[0].innerHTML = ''
	document.body.children[0].appendChild(a)
},

tabelPopup1: a => {
	a.stopPropagation()
	const b = [[...a.target.parentElement.parentElement.children].indexOf(a.target.parentElement)-6, [...a.target.parentElement.parentElement.parentElement.children].indexOf(a.target.parentElement.parentElement)]
	const c = el({a:'div', b:document.body, d:{style:'position:fixed; top:0; left:0; width:100vw; height:100vh;', 'data-a':JSON.stringify([a.target.parentElement.parentElement.parentElement.id, ...b])}, e:{click:a=>{a.stopPropagation();document.body.removeChild(a.target)}}})
	const d = el({a:'div', b:c, d:{style:`position:fixed; top:${a.target.parentElement.getBoundingClientRect().top+7}px; left:${a.target.getBoundingClientRect().right}px; background:rgba(255,255,255,0.9); display:flex; flex-direction:column; gap:3px; padding:7px 11px;`}, e:{click:a=>{a.stopPropagation()}}})
	el({a:'span', c:['Capacity', 'ISR', 'Gangguan', 'Tsel', 'Unspeck Quality', '', 'SOW'][b[0]], b:el({a:'img', b:el({a:'div', b:d}), d:{src:m.icon.down, style:'float:right; height:17px;'}}).parentElement});
	[
		['OLT', 'ONT', 'Radio', 'Metro', '-'],
		['ISR', '-'],
		['TBB', 'IPBB', '-'],
		['Power', 'Suhu', 'Site Tsel', '-'],
		['Ticket', 'Non Ticket'],
		[],
		['DID', 'CSO', 'TREG', 'DSO', 'SPM'],
	][b[0]].forEach(a=>{ el({a:'div', b:d, c:a, d:{class:'tabelPopup'}, e:{click:a=>{
		const b = JSON.parse(a.target.parentElement.parentElement.getAttribute('data-a'))
		console.log(b)
		const c = document.getElementById(b[0])
		console.log(c)
		c.children[b[2]].children[b[1]+6].children[0].textContent = a.target.textContent
		console.log(a.target.textContent)
		document.body.removeChild(a.target.parentElement.parentElement)
	}}}) })
	d.style.left = (a.target.getBoundingClientRect().left - d.offsetWidth)+'px'
},

popupLogbookTicketQuality: a => {
	a.stopPropagation()
	const b = [[...a.target.parentElement.parentElement.children].indexOf(a.target.parentElement)-9, [...a.target.parentElement.parentElement.parentElement.children].indexOf(a.target.parentElement.parentElement)]
	const c = el({a:'div', b:document.body, d:{style:'position:fixed; top:0; left:0; width:100vw; height:100vh;', 'data-a':JSON.stringify([a.target.parentElement.parentElement.parentElement.id, ...b])}, e:{click:a=>{a.stopPropagation();document.body.removeChild(a.target)}}})
	const d = el({a:'div', b:c, d:{style:`position:fixed; top:${a.target.parentElement.getBoundingClientRect().top+7}px; left:${a.target.getBoundingClientRect().right}px; background:rgba(255,255,255,0.9); display:flex; flex-direction:column; gap:3px; padding:7px 11px;`}, e:{click:a=>{a.stopPropagation()}}})
	el({a:'span', c:['RCA', 'Update Treg', '', 'Update Witel'][b[0]], b:el({a:'img', b:el({a:'div', b:d}), d:{src:m.icon.down, style:'float:right; height:17px;'}}).parentElement});
	[
		['Suhu Tinggi', 'Koneksi Lambat', 'Packet Loss', 'Hardware Fault', 'Jitter', 'Packet Discard', 'Hardware Fault', 'Latency Tinggi', 'Alarm', 'Bandwidth Tidak Sesuai', 'Rx Tx Power diluar Tolak Ukur'],
		['Capacity', 'Issue ISR', 'Comcase', 'Tsel', 'Issue Availability (dikembalikan ke DSO)', 'Lainnya (diluar DSO)'],
		[],
		['Capacity', 'Issue ISR', 'Comcase', 'Tsel', 'Issue Availability (dikembalikan ke DSO)', 'Lainnya (diluar DSO)'],
		['Suhu Tinggi', 'Redaman', 'Tcon Setting', 'Packet Loss', 'Latency', 'Jitter', 'Alarm', 'Hardware Fault', 'Intermitten', 'Koneksi Lambat', 'Bandwidth Tidak Sesuai', 'Rx Tx Power diluar Tolak Ukur', 'Packet Discard'],
	][b[0]].forEach(a=>{ el({a:'div', b:d, c:a, d:{class:'tabelPopup'}, e:{click:a=>{
		const b = JSON.parse(a.target.parentElement.parentElement.getAttribute('data-a'))
		console.log(b)
		const c = document.getElementById(b[0])
		console.log(c)
		c.children[b[2]].children[b[1]+6].children[0].textContent = a.target.textContent
		console.log(a.target.textContent)
		document.body.removeChild(a.target.parentElement.parentElement)
	}}}) })
	d.style.left = (a.target.getBoundingClientRect().left - d.offsetWidth)+'px'
},

init: () => {
	m.home()
	m.login1()
	m.page4(document.body.children[0])
	m.page3(document.body.children[0])
	m.page2(document.body.children[0])
	m.page1(document.body.children[0])
}

}

addEventListener('load', m.init)